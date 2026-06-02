# 🛸 MEND — Orbital Debris Removal System

> *"O espaço pertence à eternidade. O lixo, não."*

Aplicativo mobile desenvolvido em React Native + Expo SDK 55 + TypeScript para a **FIAP Global Solution 2026 — Space Connect Challenge**.

---

## 🎬 Antes de tudo: assista ao nosso Pitch

> **2 minutos que mudam a forma como você olha pro céu.** 🌌
>
> Toda noite, 130 milhões de fragmentos cruzam a órbita a 28.000 km/h. Nós decidimos fazer algo a respeito — e queremos te mostrar como.
>
> ### ▶️ **[CLIQUE AQUI E ASSISTA AO PITCH DA MEND »](LINK-DO-PITCH-AQUI)**
>
> *Sem spoilers. Só aperta o play e deixa a gente te levar até a órbita baixa.* 🛰️

---

## 📱 Sobre o Projeto

O **MEND** é um sistema de remoção de detritos orbitais que combina **laser de ablação** e **garras de captura** para limpar a órbita terrestre baixa (LEO). Este aplicativo mobile é a interface de monitoramento e controle do sistema, consumindo dados reais da **NASA API**.

### O Problema
- **130 milhões** de fragmentos orbitais em LEO
- Satélites mortos levam **80 anos** para cair naturalmente
- Síndrome de Kessler: reação em cadeia de colisões
- Starlink realizou **50.000 manobras de desvio** em apenas 6 meses de 2024

### A Solução MEND
- Sistema orbital reutilizável (laser + garras)
- Reduz tempo de reentrada de **80 anos para 3 anos**
- Mercado de **$13,5 bilhões** até 2035

---

## 🌱 Alinhamento com ODS da ONU

| ODS | Objetivo |
|-----|----------|
| 🏭 ODS 9 | Indústria, inovação e infraestrutura |
| 🏙️ ODS 11 | Cidades e comunidades sustentáveis |
| 🌡️ ODS 13 | Ação contra mudança climática |
| 🌾 ODS 2 | Agricultura sustentável (satélites de monitoramento) |
| 📈 ODS 8 | Crescimento econômico inclusivo |

---

## 📱 Funcionalidades

### 🏠 Início (Home)
- Dashboard com estatísticas orbitais em tempo real
- Indicadores: total de detritos, risco crítico, missões ativas
- Banner de alerta com objetos de risco elevado
- Resumo das missões MEND ativas
- Dados da NASA NeoWs API

### 🌐 Rastreamento
- Lista completa de objetos orbitais rastreados (dados NASA)
- Busca por nome, país e tipo
- Filtros por nível de risco (crítico, alto, médio, baixo)
- Ordenação por risco, altitude, velocidade ou tamanho
- Cards com informações detalhadas + sistema de favoritos

### 🚀 Missões
- Lista de missões MEND (laser, captura, combinado)
- Filtros por status (ativas, planejadas, concluídas)
- Barra de progresso de probabilidade de sucesso
- Estatísticas consolidadas

### ⭐ Favoritos
- Objetos salvos localmente com AsyncStorage
- Persistência entre sessões
- Opção de limpar todos os favoritos

### ⚙️ Configurações
- Alternância Dark/Light mode
- Ativação de notificações e atualização automática
- Seleção de unidades (métrico/imperial)
- Informações sobre o projeto

---

## 🧱 Estrutura do Projeto

```
MendApp/
├── App.tsx
├── src/
│   ├── components/
│   │   ├── StatCard.tsx
│   │   ├── DebrisCard.tsx
│   │   ├── MissionCard.tsx
│   │   └── LoadingScreen.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── TrackingScreen.tsx
│   │   ├── MissionsScreen.tsx
│   │   ├── FavoritesScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── services/
│   │   ├── nasaApi.ts
│   │   └── debrisService.ts
│   ├── hooks/
│   │   └── useDebris.ts
│   ├── contexts/
│   │   ├── ThemeContext.tsx
│   │   └── FavoritesContext.tsx
│   ├── storage/
│   │   ├── favoritesStorage.ts
│   │   └── settingsStorage.ts
│   ├── types/
│   │   └── index.ts
│   ├── theme/
│   │   ├── colors.ts
│   │   └── typography.ts
│   └── utils/
│       └── formatters.ts
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Expo Go app (Android/iOS) **ou** emulador

### Instalação

```bash
# Clone o repositório
git clone <url-do-repo>
cd MendApp

# Instale as dependências
npm install

# Inicie o projeto
npm start
```

### Executar no dispositivo

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

Escaneie o QR code com o app **Expo Go** no seu celular.

---

## 🔌 APIs Utilizadas

| API | Descrição | Endpoint |
|-----|-----------|---------|
| NASA NeoWs | Near Earth Objects (detritos/asteroides) | `api.nasa.gov/neo/rest/v1/feed` |
| NASA APOD | Astronomy Picture of the Day | `api.nasa.gov/planetary/apod` |
| NASA DONKI | Solar Flares (clima espacial) | `api.nasa.gov/DONKI/FLR` |

> A chave `DEMO_KEY` já está configurada. Para produção, obtenha uma chave gratuita em [api.nasa.gov](https://api.nasa.gov).

---

## 🧠 Tecnologias

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React Native | 0.76 | Framework mobile |
| Expo SDK | 55 | Build e ferramentas |
| TypeScript | 5.3 | Tipagem estática |
| React Navigation | 6 | Navegação (Tabs + Stack) |
| Axios | 1.7 | Consumo de APIs |
| AsyncStorage | 2.1 | Persistência local |
| Context API | — | Estado global |

---

## 🏆 Critérios de Avaliação

| Critério | Implementação |
|----------|--------------|
| ✅ Estrutura e Organização | `src/` com 8 módulos separados |
| ✅ React Native + TypeScript | 100% tipado |
| ✅ Navegação | Bottom Tabs com 5 telas |
| ✅ Consumo de API | NASA NeoWs + APOD + DONKI (Axios) |
| ✅ Persistência Local | AsyncStorage (favoritos + settings) |
| ✅ Interface UI/UX | Dark/Light mode, cards animados, badges |
| ✅ Funcionalidades | Dashboard, listagem, filtros, busca, favoritos |
| ✅ Código e Boas Práticas | Hooks, Context, Service Layer, formatters |
| ✅ Criatividade | Tema espacial MEND com dados NASA reais |

---

## 👥 Integrantes

| Nome | RM |
|------|----|
| _(adicionar integrantes)_ | RM XXXXX |

---

## 📚 Referências

- [NASA API](https://api.nasa.gov/)
- [ESA ClearSpace-1](https://www.esa.int/Space_Safety/Clean_Space/ClearSpace-1)
- [Kessler Syndrome - NASA](https://www.nasa.gov/mission/orbital-debris/)
- [Perfect JSAT Laser Deorbit](https://www.jsat.net/)
