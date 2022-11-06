#!/bin/bash
repo_root=`git rev-parse --show-toplevel`
cd $repo_root

source .env

if ! command -v yarn help &> /dev/null
then
    echo "Please install yarn"
    exit
fi

if ! command -v pm2 list &> /dev/null
then
    echo "Please install pm2"
    exit
fi

# Create backup directory
backup_date=$(date +%Y%m%d)
backup_dir=`mkdir -p backups/$backup_date`
echo "Created directory $repo_root/backups/$backup_date"

# Backup files and database 
backup_name="$repo_root/backups/$backup_date/backup-$backup_date.tar.gz"
backup_progress=`tar --exclude='./backups' -czf $backup_name *`
echo "Created platform backup at $backup_name"
database_progress=`mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $repo_root/backups/$backup_date/database.sql`
echo "Created database archive at $backup_name"

# Pull latest changes
git pull

# Install dependencies
yarn install

# Run migrations
yarn run db:migrate:deploy

# Build assets
yarn run build

# Run process manager
pm2 reload ecosystem.config.js