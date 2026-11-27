import type { Metadata } from 'next';
import './style.css';
export const metadata:Metadata={title:'Monvi — Seu dinheiro, seus planos',description:'Organize suas finanças',manifest:'/manifest.webmanifest'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
