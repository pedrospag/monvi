# Monvi — v0.1.1 (prévia de desenvolvimento)
Seu dinheiro. Seus planos. Seu controle.

Aplicação Next.js/React/TypeScript com CSS responsivo próprio, gráfico de rosca CSS e Supabase opcional. Nesta versão não é necessário criar conta externa para experimentar localmente com dados fictícios. O modo local usa armazenamento do navegador, sem sincronização. Não utilize dados reais até a validação de segurança e produção.

## Executar no Windows
1. Extraia o ZIP. Instale Node.js 22 LTS ou versão compatível mais recente (https://nodejs.org/).
2. Abra a pasta `monvi` no VS Code e execute no terminal:

```powershell
npm.cmd install
npm.cmd run dev
```
3. Abra http://localhost:3000. Se a porta estiver ocupada, consulte a URL exibida no terminal.
4. Use `npm.cmd test` para os testes financeiros e `npm.cmd run build` para verificar a compilação.

## Conta e dados online (configuração posterior)
Crie um projeto de testes no Supabase, execute `supabase/schema.sql` no SQL Editor uma vez e habilite autenticação por e-mail. Copie `.env.example` para `.env.local`; preencha a URL e a chave pública/anon do projeto. Não use a chave service_role. Reinicie o servidor. O modo local não migra automaticamente seus dados para a nuvem. Configure as URLs de redirecionamento e confirmação de e-mail do Supabase antes de publicar. Para produção, crie um projeto separado e configure as mesmas variáveis na Vercel.

O esquema inicial usa um documento JSON por usuário, com RLS. Não foi testado contra um Supabase real. Alterações simultâneas de dispositivos podem sobrescrever umas às outras (última gravação vence); isso precisa ser corrigido antes da produção. Não há recuperação de senha ou auditoria completas nesta versão. O manifesto PWA e ícones estão presentes, mas instalação e comportamento mobile ainda precisam ser testados; não há suporte offline. Não publicar dados ou credenciais no GitHub.

## GitHub
Crie um repositório privado vazio chamado `monvi` quando estiver pronto. Na pasta do projeto:

```powershell
git init -b main
git add .
git commit -m "feat: estrutura inicial do Monvi"
git remote add origin https://github.com/SEU_USUARIO/monvi.git
git push -u origin main
```
Na outra máquina, clone o repositório, execute `npm.cmd install` e configure seu próprio `.env.local` se necessário. Inicie cada sessão com `git pull --ff-only` e finalize com revisão, testes, commit e push. Envie também o package-lock.json gerado pelo primeiro npm.cmd install.

## Estado atual
Implementado: navegação mensal, ganhos e gastos personalizados, recorrências finitas/indefinidas, parcelamentos em centavos, gráfico, previsões, metas e aportes/retiradas, temas, integração inicial de autenticação e persistência Supabase. A edição e exclusão atuais afetam todo o cadastro, não apenas ocorrências futuras. Sem conciliação bancária, cartões, moedas adicionais ou status pago/pendente. A taxa de economia é global, não individual por mês. A previsão representa fluxo mensal, não saldo bancário acumulado.

Validação: quatro testes Node passaram. O ambiente de criação não tinha acesso ao npm, portanto não foi possível instalar dependências, gerar lockfile, compilar, testar navegador ou publicar. Não é uma versão pronta para produção.

## Atualização v0.1.1
- Meta de economia editável diretamente no dashboard, com atalho também em Ajustes. O percentual continua global.
- Tema claro com superfícies cinza-lavanda suaves; tema escuro preservado.
- Para atualizar, pare o servidor, copie os arquivos da nova versão para a pasta existente (preserve `.env.local`, `.git` e `package-lock.json`), execute `npm.cmd install` e `npm.cmd run dev`. O armazenamento local permanece com a mesma chave e origem (use a mesma URL/porta).
