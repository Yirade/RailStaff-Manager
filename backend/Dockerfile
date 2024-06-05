FROM node:14

# Installa dipendenze di sistema
RUN apt-get update && apt-get install -y libaio1 unzip

# Copia l'Oracle Instant Client zip file nel container e installalo
COPY instantclient-basiclite-linux.x64-19.19.0.0.0dbru.el9.zip /tmp/instantclient.zip
RUN mkdir -p /opt/oracle \
    && unzip /tmp/instantclient.zip -d /opt/oracle \
    && rm /tmp/instantclient.zip

# Imposta variabili d'ambiente per l'Instant Client
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_19_19
ENV PATH=$PATH:/opt/oracle/instantclient_19_19

# Imposta la directory di lavoro
WORKDIR /usr/src/app

# Copia i file del progetto
COPY package*.json ./

# Installa le dipendenze del progetto
RUN npm install

# Copia il resto dei file del progetto
COPY . .

# Espone la porta dell'applicazione
EXPOSE 3000

# Comando per avviare l'applicazione
CMD ["node", "server.js"]
