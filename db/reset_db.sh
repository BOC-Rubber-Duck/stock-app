#!/bin/sh
dropdb stonks
createdb stonks
psql stonks <./setup.sql