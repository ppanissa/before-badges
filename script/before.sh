#!/bin/bash

# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# BeGaming - Before TI
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------

function init() {
  if [[  $1 == '--key' ]]; then
    bash -c "adonis key:generate"
  else
    FILE_ENV=.env
    FILE_ENV_TEST=.env.testing

    if [ ! -f "$FILE_ENV" ]; then
      cp -- .env.example $FILE_ENV;
      echo "- Foi criado arquivo: $FILE_ENV"
    fi

    if [ ! -f "$FILE_ENV_TEST" ]; then
      cp -- .env.example $FILE_ENV_TEST;
      echo "- Foi criado arquivo: $FILE_ENV_TEST"
    fi
  fi
}


# | ----------------------------------------------------------------------------
# | Start
# | ----------------------------------------------------------------------------
function start() {
  init
  docker-compose up -d $1;
}

# | ----------------------------------------------------------------------------
# | Stop
# | ----------------------------------------------------------------------------
function stop() {
  docker-compose stop
}

# | ----------------------------------------------------------------------------
# | Restart
# | ----------------------------------------------------------------------------
function restart() {
  case "$1" in
    api) docker restart before-api
      ;;
    pg) docker restart before-postgres
      ;;
    redis) docker restart before-redis
      ;;
    *) stop; start
      ;;
  esac
}

# | ----------------------------------------------------------------------------
# | Bash Commands
# | ----------------------------------------------------------------------------
function bash() {
  case "$1" in
    api) docker exec -ti before-api bash $2
      ;;
    pg) docker exec -ti before-postgres bash
      ;;
    redis) docker exec -it before-redis bash
      ;;
    test) docker exec -it before-api bash -c "adonis test"
      ;;
    *)      echo "Comandos - Valid->api|pg|redis|test"
          ;;
  esac
}

# | ----------------------------------------------------------------------------
# | Test
# | ----------------------------------------------------------------------------
function run_test() {
  bash test
}
# | ----------------------------------------------------------------------------
# | Recreate
# | ----------------------------------------------------------------------------
function recreate() {
  stop
  docker-compose rm -f
  start --build
}

# | ----------------------------------------------------------------------------
# | Function for check func exists
# | ----------------------------------------------------------------------------
function_exists() {
  declare -f -F $1 > /dev/null
  return $?
}

# if [ "$UID" -ne 0 ]
#   then echo "Please run as root"
#   exit
# fi

if [ $# -lt 1 ]
then
  echo "Comandos: start | stop | restart | bash (api|pg|redis|test) | test"
  exit
fi

# | ----------------------------------------------------------------------------
# | Switch case commands
# | ----------------------------------------------------------------------------
case "$1" in
  init) function_exists init && init $2
    ;;
  start) function_exists start && start $2
    ;;
  stop)  function_exists stop && stop $2
    ;;
  restart)  function_exists restart && restart $2
    ;;
  bash) function_exists bash && bash $2
    ;;
  test) function_exists run_test && run_test $2
    ;;
  recreate) function_exists recreate && recreate
    ;;
  *)  echo "Invalid command - Valid->start|stop|restart 'api, pg, redis'|bash |test"
    ;;
esac
