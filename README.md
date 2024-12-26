# Реализация тестового задания для Авега софт
`monorepo`, `продвинутый jwt с refresh`,  `backend на nest.js` 

В рамках работы над проектом были соблюдены все требования по тз - [ссылка](https://docs.yandex.ru/docs/view?url=ya-disk-public%3A%2F%2FnawpAB13%2BvUu6VJlqJXlkBUko1De2Yphbi5%2B5RkLxlP45bqyaXN4G%2F3%2FQMZYAU60lsg4VIaLrfRKbQetv4dueQ%3D%3D&name=%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5%20%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BB%D1%8F%20%D1%81%D0%BE%D0%B8%D1%81%D0%BA%D0%B0%D1%82%D0%B5%D0%BB%D1%8F.docx&nosw=1)

## Инструкция по локальному запуску
`в проекте используется docker`, `в качестве пакетного менеджера выступает yarn`

1. **yarn install**
2. **yarn dev:landing** (если не хватает прав запускать от sudo) - 
Запускает vite dev сервер на порту 3000

> **Если после первого развертывания и оптимизации зависимости pinia возникает ошибка getActivePinia()** - перезапустите dev сервер

4. **yarn dev:backend** (если не хватает прав запускать от sudo) - 
Запускает скачивание контейнеров postgresql, adminer, сборку Dockerfile и их развертывание.

## Краткое описание архитектуры и особенностей реализации
### Монорепозиторий 
С возможностью _не дублировать dto и файлы конфигураций_, тк при текущем подходе все что можно расшарить
лежит в папке internal, содержимое которой доступно как для бекенда под docker, так и для фронтенда.
### Архитектура
Без архитектуры, стандартный для vue composition api подход работы с composables и stores.
> FSD слишком громоздка для такого простенького приложения, а потому усложняла бы реализациию проекта.
### Более сложный и грамотный jwt
С refresh токеном и авторефрешем в случае фейла запроса со статус кодом 403.
Авторефреш реализован через instance накстовского $fetch (он же ofetch под капотом)
### Общий стор и шаблон для модалок
> Реализация взята с undeads на котором было по меньшей мере 60+ активных модальных окон.
Система позволяет соблюсти идентичный подход к разработке модалок, если на проекте больше одного разраба.
### Nest на беке
> потому что умею))

Swagger для просмотра ендопоинтов доступен по `http://localhost:3002/api/docs`.
На беке реализована валидация поступаемых данных, guard для jwt на защищенные маршруты а также проверка на соответствие типов.
