This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



Установка Redis на Windows
Шаг 1 — заходим в репозиторий на GitHub портированной версии по ссылке: https://github.com/microsoftarchive/redis. 

Шаг 2 — переходим на вкладку «Releases».

Шаг 3 — выбираем последний релиз.

Шаг 4 — скачиваем файл с расширением .msi.
![alt text](/git-statics/image1.png)

Шаг 5 — после загрузки откройте файл. Начнется установка.

Шаг 6 — во время установки инсталлятор предложит вам добавить Redis в PATH. Если хотите использовать СУБД из командной строки, проставьте галочку напротив этого пункта.

Шаг 7 — во время выбора порта рекомендуется оставить стандартное значение 6379.

Шаг 8 — после установки необходимо перезагрузить компьютер.

После загрузки компьютера проверим работоспособность Redis. Для этого переходим в папку где установлен redis (C:\Program Files\Redis) в ней открываем терминал от имени администратора и запускаем команду .\redis-server.exe

При её выполнении может возникнуть ошибка со следующим сообщением:

![alt text](/git-statics/image.png)

Проблема заключается в том, что Windows в автоматическом режиме после установки регистрирует службу, к которой привязывает порт 6379. Когда выполняется команда redis-server, исполнитель обращается к файлу конфигурации и использует порт по-умолчанию, т.е. 6379. Из-за этого возникает ошибка.

Чтобы её решить открываем командную строку и делаем следующее:

запускаем .\redis-cli.exe;
выключаем сервер командой shutdown;
выходим командой exit.

Вот набор команд для стандартного каталога:

![alt text](/git-statics/image2.png)

После этих действий команда .\redis-server.exe успешно выполнилась:

![alt text](/git-statics/image3.png)

астройки Redis описываются в двух файлах: redis.windows.conf и redis.windows-service.conf. 

Redis.windows-service.conf описывает настройки СУБД, запущенной в качестве службы. Этот формат подразумевает работу в фоновом режиме под управлением операционной системы (запуск при перезагрузке, перезапуск при сбоях и т.п).
Redis.windows.conf относится к использованию СУБД из командной строки с помощью redis-cli. Это же относится и к использованию СУБД в своих скриптах.
Настройка этих файлов приведет к изменению работы Redis. В нашем случае настроек минимальное количество: СУБД прослушивает любые подключения. Это не совсем безопасно, поэтому позволим подключение к Redis только с localhost. Для этого в файлах конфигурации находим задокументированную строку #bind 127.0.0.1 и удаляем решетку «#»:

![alt text](/git-statics/image4.png)