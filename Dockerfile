# Imagen base con Node 22 LTS
FROM node:22

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo los archivos de dependencias primero
COPY package*.json ./

# Instalar dependencias (se cachea esta capa)
#RUN npm install --production=false
RUN npm install

# Copiar el código fuente
COPY ./src ./src

# Exponer el puerto (ajústalo si tu app usa otro)
EXPOSE 8080

# Comando por defecto para arrancar la app
CMD ["npm", "start"]