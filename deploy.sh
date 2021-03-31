#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# переход в нужных репозиторий
cd d:
cd git_test\skillbox_learn

# сборка приложения
npm run build

# переход в каталог сборки
cd dist

# инициализация репозитория и загрузка кода в GitHub
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:Grettalinn/vue-app.git master:gh-pages

