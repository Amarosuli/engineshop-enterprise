FROM  alpine:latest

ARG   PB_VERSION=0.19.2

RUN   apk add --no-cache \
      unzip \
      ca-certificates

ADD   https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip

RUN   unzip /tmp/pb.zip -d /pb/

# copy the local pb_migrations
COPY  ./pb_migrations /pb/pb_migrations
#copy the local pb_data
COPY  ./pb_data /pb/pb_data
# copy the local pb_hooks
# COPY  ./pb_hooks /pb/pb_hooks

EXPOSE 81

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:81"]