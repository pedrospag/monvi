-- Apply in the development SQL Editor before testing v0.1.2.
begin;
alter table public.monvi_state add column if not exists revision bigint not null default 0;
create or replace function public.monvi_save_state(p_data jsonb,p_expected_revision bigint)
returns bigint language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); new_revision bigint;
begin
 if uid is null then raise exception 'Authentication required'; end if;
 if p_data is null or jsonb_typeof(p_data) <> 'object' then raise exception 'Invalid data'; end if;
 if p_expected_revision is null then
  insert into public.monvi_state(user_id,data,revision,updated_at)
  values(uid,p_data,0,now()) on conflict(user_id) do nothing returning revision into new_revision;
 else
  update public.monvi_state set data=p_data,revision=revision+1,updated_at=now()
  where user_id=uid and revision=p_expected_revision returning revision into new_revision;
 end if;
 return new_revision;
end; $$;
revoke all on function public.monvi_save_state(jsonb,bigint) from public,anon;
grant execute on function public.monvi_save_state(jsonb,bigint) to authenticated;
revoke insert,update,delete on public.monvi_state from authenticated,anon;
commit;
