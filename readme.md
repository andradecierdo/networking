<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

## Laravel 5.8 and React 16.8

## Overview
A laravel-react application with two entities:
 1. User
 2. Experiences
 ##### Relationships
 1. `User` has many `Experiences`
 2. `Experience` belongs to a `User`

## Prerequisite

1. Make sure you have [composer](https://getcomposer.org/download/) installed.
2. Make sure you have latest stable version of [node](https://nodejs.org/en/download/) installed.

### Setup

1. `git clone`
2. `create a .env file copy content from .env.example and update the values`
3. `composer install && composer update`
4. `php artisan cron:refresh-database`
5. `npm install`
5. `npm run watch`
7. `php artisan serve`


### Functionalities

- [x] Passport for authentication
- [x] User Login
- [x] User Register
- [x] User Update
- [x] Experience Add
- [x] Experience Update
- [x] Experience Delete
- [x] Experience View Modal
- [x] Form validation Client and Server
- [x] https://react-bootstrap.netlify.com/ design

