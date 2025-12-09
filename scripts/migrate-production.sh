#!/bin/bash
# Script para aplicar migraciones en producción
# Úsalo solo después de configurar DATABASE_URL en Vercel

# Opción 1: Desde tu local con DATABASE_URL de producción
# DATABASE_URL="tu_url_produccion" npx prisma migrate deploy

# Opción 2: Desde Vercel CLI
# vercel env pull .env.production
# npx prisma migrate deploy
