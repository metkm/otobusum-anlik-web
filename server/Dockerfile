FROM node:lts-alpine AS node-builder

WORKDIR /usr/src/otobusum-anlik
COPY . .

ARG NUXT_PUBLIC_SCRIPTS_GOOGLE_MAPS_API_KEY
ARG NUXT_PUBLIC_BASE_URL

RUN npm install
RUN npm run generate

FROM rust:latest

COPY --from=node-builder /usr/src/otobusum-anlik /usr/src/otobusum-anlik

WORKDIR /usr/src/otobusum-anlik/server

RUN cargo build --release

EXPOSE ${PORT}
ENTRYPOINT [ "./target/release/server" ]
