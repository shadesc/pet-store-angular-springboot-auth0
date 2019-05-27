# Coding Challenge - Author: Chadi Cortbaoui
### Coding challenge which I built for a full stack interview in early 2018
➔ **4 days** deadline for delivery of a fully functional application
- Angular 5
- Spring Boot 2.0.1
- (BONUS) Provide authentication and authorization: Used [Auth0](https://auth0.com/) with Angular's [AuthGuard / CanActivate](https://angular.io/api/router/CanActivate)

### App developed based on provided Swagger: http://petstore.swagger.io/

## Front end
<dl>
  <dt>Angular 5</dt>
  
  <dt>Unit tests</dt>
  <dd>Jasmine, Karma, FakeAsync/tick() etc...</dd>

  <dt>Multiple environments included</dt>
  <dd>DEV and PROD</dd>
</dl>

### run
Use DEV environment by running : npm start (which will call ng serve)

➔ Open it in browser: http://localhost:4200

**Please note** for the purpose of this app, CSS was done from scratch but it was **NOT** made responsive (out of scope). So use it on a desktop browser.

## Back end
Spring boot application, with an H2 (in memory) database used for the purpose of the demo.
- Some unit and integration testing included.

### run
- Run java application (From IDE or command line)
- Runs on : http://localhost:8080
- Postman command file included in this folder

## What was the scope of this project?
 For this project the focus is only on: list, find, add and delete a pet (from Swagger)
 
 #### Extra bonus requested back then:
> Deploy on cloud

I took down the cloud endpoint, so run it locally on localhost

> Have authentication and authorization, both implemented with Auth0 as my choide for IDaaS platform

Built it in a way that is an SSO endpoints, added some entitlements (for authorization)

### Admin grant:
> admin ( at ) petstore.com

> pwd:123456

> Authorized to: View pets and find pet by id, add, edit and delete pet. Please note only pets marked as sold can be deleted

### Regular non admin grant:
> user ( at ) petstore.com

> pwd:123456

> Authorized to: View pets and find pet by id

> PS: There is AuthGard/CanActivate() implemented in the Angular app

# How to use this application end-to-end to try it out?
➔ Run backend (Spring boot app, run it from any IDE you prefer)

➔ Run front end (npm start)
- Open in browser: http://localhost:4200 --> will auto redirect to http://localhost:4200/pets/list
- Now you can view pets.
- Try to find pet by id (for list of ids run get-all-pets in postman collection and pick an id). It will display a single pet for you if found / error message if not found

➔ Now try authorization/authentication: click login
➔ login as admin first
- You should be able to: view, find by id, edit, add, delete (only pets marked as sold can be deleted)
➔ Now try adding pet:
- Select category
- Select pet name (validation is hook to input). This field is required
- Photos: paste Urls of photos (one or many) and add. You should see a thumbnail of picture.
- Select Pet tags (1 or many)
- Mark as: available or sold

➔ Now try editing pet

➔ Now try deleting pet

➔ login as non admin now:
- You should be able to: view, find by id
