FROM python:3.11.0-slim
ENV PYTHONUNBUFFERED 1
ENV PYTHONWARNINGS=ignore
ENV CURL_CA_BUNDLE=""
EXPOSE 8000/tcp
RUN apt-get update -y --no-install-recommends
RUN apt-get install -y --no-install-recommends \
    git `# для установки зависимостей из git` \
    gcc `# для cryptography`
ENV PATH="${PATH}:/root/.local/bin"
RUN mkdir /app
COPY requirements.txt /app/
WORKDIR /app/
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
COPY wait-for /usr/bin/
RUN chmod +x /usr/bin/wait-for
COPY / /app/
RUN chmod +x entrypoint.*
