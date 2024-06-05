FROM oracleinanutshell/oracle-xe-11g

COPY init.sql /docker-entrypoint-initdb.d/

RUN chmod -R 755 /docker-entrypoint-initdb.d/
