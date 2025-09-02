# 🗄️ Esquema do Banco de Dados - BetiHub

## Visão Geral

Este documento descreve a estrutura do banco de dados do módulo de briefing do BetiHub, implementado com Prisma ORM e PostgreSQL.

## 📊 Diagrama de Relacionamentos

```
Cliente (1) ──────── (N) Briefing (1) ──────── (N) Relatorio
    │                        │                        │
    │                        │                        │
    └── (N) ClienteTemplate ─┤                        │
                             │                        │
        Template (N) ────────┘                        │
                                                      │
        Usuario (1) ─────── (N) UsuarioPermissao      │
                                        │             │
        Permissao (N) ──────────────────┘             │
                                                      │
        AuditoriaLog (N) ─────────────────────────────┘
```

## 🏗️ Estrutura das Tabelas

### Cliente
Armazena informações dos clientes que utilizarão o sistema de briefing.

```sql
CREATE TABLE Cliente (
    id            VARCHAR(36)   PRIMARY KEY DEFAULT gen_random_uuid(),
    nome          VARCHAR(255)  NOT NULL,
    email         VARCHAR(255)  UNIQUE NOT NULL,
    empresa       VARCHAR(255),
    telefone      VARCHAR(20),
    setor         VARCHAR(100),
    cargo         VARCHAR(100),
    endereco      TEXT,
    observacoes   TEXT,
    ativo         BOOLEAN       DEFAULT true,
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
```

### Briefing
Controla as sessões de briefing e o progresso de cada cliente.

```sql
CREATE TABLE Briefing (
    id              VARCHAR(36)   PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id      VARCHAR(36)   NOT NULL REFERENCES Cliente(id),
    template_id     VARCHAR(36)   REFERENCES Template(id),
    titulo          VARCHAR(255)  NOT NULL,
    descricao       TEXT,
    status          briefing_status DEFAULT 'rascunho',
    progresso       INTEGER       DEFAULT 0 CHECK (progresso >= 0 AND progresso <= 100),
    dados_coletados JSONB         DEFAULT '{}',
    prazo_estimado  DATE,
    prazo_real      DATE,
    prioridade      prioridade_level DEFAULT 'media',
    tags            TEXT[],
    created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    completed_at    TIMESTAMP
);

-- Enum Types
CREATE TYPE briefing_status AS ENUM ('rascunho', 'em_andamento', 'aguardando_validacao', 'concluido', 'cancelado');
CREATE TYPE prioridade_level AS ENUM ('baixa', 'media', 'alta', 'urgente');
```

### Template
Templates reutilizáveis para diferentes tipos de briefing.

```sql
CREATE TABLE Template (
    id            VARCHAR(36)   PRIMARY KEY DEFAULT gen_random_uuid(),
    nome          VARCHAR(255)  NOT NULL,
    categoria     VARCHAR(100)  NOT NULL,
    descricao     TEXT,
    estrutura     JSONB         NOT NULL, -- Definição das perguntas e seções
    configuracao  JSONB         DEFAULT '{}', -- Configurações específicas
    versao        VARCHAR(10)   DEFAULT '1.0',
    ativo         BOOLEAN       DEFAULT true,
    publico       BOOLEAN       DEFAULT false,
    autor_id      VARCHAR(36),
    uso_count     INTEGER       DEFAULT 0,
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
```

### Relatorio
Relatórios gerados a partir dos briefings concluídos.

```sql
CREATE TABLE Relatorio (
    id            VARCHAR(36)   PRIMARY KEY DEFAULT gen_random_uuid(),
    briefing_id   VARCHAR(36)   NOT NULL REFERENCES Briefing(id),
    formato       formato_relatorio DEFAULT 'pdf',
    titulo        VARCHAR(255)  NOT NULL,
    conteudo      TEXT,         -- Conteúdo em HTML/Markdown
    dados_grafico JSONB,        -- Dados para gráficos
    url_arquivo   VARCHAR(500), -- URL do arquivo gerado
    tamanho_kb    INTEGER,
    hash_arquivo  VARCHAR(64),  -- SHA256 do arquivo
    downloads     INTEGER       DEFAULT 0,
    compartilhado BOOLEAN       DEFAULT false,
    expira_em     TIMESTAMP,
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- Enum Type
CREATE TYPE formato_relatorio AS ENUM ('pdf', 'html', 'docx', 'pptx', 'excel');
```

### Usuario
Sistema de usuários para controle de acesso.

```sql
CREATE TABLE Usuario (
    id            VARCHAR(36)   PRIMARY KEY DEFAULT gen_random_uuid(),
    nome          VARCHAR(255)  NOT NULL,
    email         VARCHAR(255)  UNIQUE NOT NULL,
    senha_hash    VARCHAR(255)  NOT NULL,
    foto_perfil   VARCHAR(500),
    cargo         VARCHAR(100),
    departamento  VARCHAR(100),
    ativo         BOOLEAN       DEFAULT true,
    ultimo_login  TIMESTAMP,
    tentativas_login INTEGER    DEFAULT 0,
    bloqueado_ate TIMESTAMP,
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
```

### Permissao
Define as permissões disponíveis no sistema.

```sql
CREATE TABLE Permissao (
    id          VARCHAR(36)   PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo      VARCHAR(50)   UNIQUE NOT NULL,
    nome        VARCHAR(100)  NOT NULL,
    descricao   TEXT,
    modulo      VARCHAR(50)   NOT NULL,
    ativo       BOOLEAN       DEFAULT true,
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
```

### UsuarioPermissao
Relacionamento many-to-many entre usuários e permissões.

```sql
CREATE TABLE UsuarioPermissao (
    id           VARCHAR(36)   PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id   VARCHAR(36)   NOT NULL REFERENCES Usuario(id),
    permissao_id VARCHAR(36)   NOT NULL REFERENCES Permissao(id),
    concedida_por VARCHAR(36)  REFERENCES Usuario(id),
    concedida_em TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    expira_em   TIMESTAMP,
    ativo       BOOLEAN       DEFAULT true,
    
    UNIQUE(usuario_id, permissao_id)
);
```

### AuditoriaLog
Log de todas as ações importantes do sistema.

```sql
CREATE TABLE AuditoriaLog (
    id            BIGSERIAL     PRIMARY KEY,
    usuario_id    VARCHAR(36)   REFERENCES Usuario(id),
    acao          VARCHAR(100)  NOT NULL,
    tabela        VARCHAR(50),
    registro_id   VARCHAR(36),
    dados_antes   JSONB,
    dados_depois  JSONB,
    ip_address    INET,
    user_agent    TEXT,
    timestamp     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
```

## 🔍 Índices Recomendados

```sql
-- Performance queries
CREATE INDEX idx_briefing_cliente_status ON Briefing(cliente_id, status);
CREATE INDEX idx_briefing_created_at ON Briefing(created_at DESC);
CREATE INDEX idx_relatorio_briefing ON Relatorio(briefing_id);
CREATE INDEX idx_usuario_email ON Usuario(email);
CREATE INDEX idx_auditoria_usuario_timestamp ON AuditoriaLog(usuario_id, timestamp DESC);
CREATE INDEX idx_auditoria_tabela_registro ON AuditoriaLog(tabela, registro_id);

-- Busca textual
CREATE INDEX idx_cliente_nome_gin ON Cliente USING gin(to_tsvector('portuguese', nome));
CREATE INDEX idx_briefing_dados_gin ON Briefing USING gin(dados_coletados);
```

## 🔒 Políticas de Segurança (RLS)

```sql
-- Row Level Security para multi-tenancy
ALTER TABLE Cliente ENABLE ROW LEVEL SECURITY;
ALTER TABLE Briefing ENABLE ROW LEVEL SECURITY;
ALTER TABLE Relatorio ENABLE ROW LEVEL SECURITY;

-- Política: Usuários só veem seus próprios dados
CREATE POLICY cliente_policy ON Cliente
    FOR ALL TO authenticated_users
    USING (id IN (
        SELECT DISTINCT cliente_id 
        FROM UsuarioCliente 
        WHERE usuario_id = current_user_id()
    ));
```

## 📈 Triggers e Funções

```sql
-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger em todas as tabelas relevantes
CREATE TRIGGER update_cliente_updated_at 
    BEFORE UPDATE ON Cliente 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_briefing_updated_at 
    BEFORE UPDATE ON Briefing 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Trigger para log de auditoria
CREATE OR REPLACE FUNCTION log_auditoria()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO AuditoriaLog (
        usuario_id, acao, tabela, registro_id, 
        dados_antes, dados_depois, timestamp
    ) VALUES (
        current_user_id(),
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
        CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN row_to_json(NEW) ELSE NULL END,
        CURRENT_TIMESTAMP
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;
```

## 📊 Métricas e Views

```sql
-- View para dashboard executivo
CREATE VIEW dashboard_metricas AS
SELECT 
    COUNT(DISTINCT c.id) as total_clientes,
    COUNT(DISTINCT b.id) as total_briefings,
    COUNT(DISTINCT CASE WHEN b.status = 'concluido' THEN b.id END) as briefings_concluidos,
    COUNT(DISTINCT r.id) as total_relatorios,
    AVG(b.progresso) as progresso_medio,
    COUNT(DISTINCT CASE WHEN b.created_at > CURRENT_DATE - INTERVAL '30 days' THEN b.id END) as briefings_mes
FROM Cliente c
LEFT JOIN Briefing b ON c.id = b.cliente_id
LEFT JOIN Relatorio r ON b.id = r.briefing_id;

-- View para performance de templates
CREATE VIEW template_performance AS
SELECT 
    t.id,
    t.nome,
    t.categoria,
    COUNT(b.id) as uso_total,
    AVG(b.progresso) as progresso_medio,
    COUNT(CASE WHEN b.status = 'concluido' THEN 1 END) as conclusoes,
    AVG(EXTRACT(days FROM (b.completed_at - b.created_at))) as tempo_medio_dias
FROM Template t
LEFT JOIN Briefing b ON t.id = b.template_id
GROUP BY t.id, t.nome, t.categoria;
```

## 🔧 Configuração Prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Cliente {
  id          String    @id @default(uuid())
  nome        String
  email       String    @unique
  empresa     String?
  telefone    String?
  setor       String?
  cargo       String?
  endereco    String?
  observacoes String?
  ativo       Boolean   @default(true)
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  
  briefings   Briefing[]
  
  @@map("cliente")
}

model Briefing {
  id              String         @id @default(uuid())
  clienteId       String         @map("cliente_id")
  templateId      String?        @map("template_id")
  titulo          String
  descricao       String?
  status          BriefingStatus @default(RASCUNHO)
  progresso       Int            @default(0)
  dadosColetados  Json           @default("{}") @map("dados_coletados")
  prazoEstimado   DateTime?      @map("prazo_estimado")
  prazoReal       DateTime?      @map("prazo_real")
  prioridade      Prioridade     @default(MEDIA)
  tags            String[]
  createdAt       DateTime       @default(now()) @map("created_at")
  updatedAt       DateTime       @updatedAt @map("updated_at")
  completedAt     DateTime?      @map("completed_at")
  
  cliente         Cliente        @relation(fields: [clienteId], references: [id])
  template        Template?      @relation(fields: [templateId], references: [id])
  relatorios      Relatorio[]
  
  @@map("briefing")
}

enum BriefingStatus {
  RASCUNHO
  EM_ANDAMENTO
  AGUARDANDO_VALIDACAO
  CONCLUIDO
  CANCELADO
  
  @@map("briefing_status")
}

enum Prioridade {
  BAIXA
  MEDIA
  ALTA
  URGENTE
  
  @@map("prioridade_level")
}
```

## 🚀 Scripts de Migração

```bash
# Inicializar Prisma
npx prisma init

# Criar migração
npx prisma migrate dev --name init_briefing_module

# Gerar cliente
npx prisma generate

# Reset database (desenvolvimento)
npx prisma migrate reset

# Deploy em produção
npx prisma migrate deploy
```

---

*Documentação atualizada em: Janeiro 2024*
*Versão do esquema: 1.0*