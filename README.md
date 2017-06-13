# PC Builder App front end

This repository is the front-end for my final project for the WDI course at General Assembly.

The PC Builder App allows users to find compatible parts for a desktop computer, it is aimed primarily at enthusiasts and gamers, it also caters for low budgets. 
It is designed to be simpler to use than any comparable tool I've found on the internet. 

This is currently the second version. 

## Dependancies

- Node.js 7.7.3
- AngularJS 1.5.8
- ngResource 1.6.4
- ui.router 0.4.2 *
- angular-jwt 0.1.9
- angular-bootstrap 2.5.0
- ngAnimate 1.6.4
- ngMessages 1.6.4
- fontawesome 4.7.0


## Deployment

I have used a gulp setup provided by my instructors. 

Download the repo and run ```yarn```, yarn runs ```bower i``` on its own.

Ensure the back-end is running and run ```gulp``` to minify the code and start the server.

I have pushed it to Heroku but I have had problems interfacing it with the back-end, it's in the heroku configuration, I'm working on it. 


## Basic explanation

### Main site

At this time, I haven't fleshed out the views, I aim to add new fields to the models and fill up some of the page space. 

So you can register and login to the site, you'll be taken to the homepage where you would view complete computers that you've put together. You can navigate to the index of completes and view computers made by other users, you're able to go to the user page of other users and your own. The show computer page has bootstrap tabs and some custom directives, you can view individual parts here and in other places. You can also browse all parts by type.

#### Form page

The main feature is the form page where you can choose the parts for your machines.

This page took a fairly long time and went through several itterations before I settled with this one. I used ng-repeat and ng-options to generate all the select fields, using the parts-by-type resource, seeded in the order I wanted to display them on the page. 

Initially, I used ngMessages to show a warning when a part was incompatible with some other chosen part, but this led to too much clicking and I wanted to find another solution. 

I looked around and found a few long-winded ways to make it happen, but in the end designed a function that could filter all other fields to only show parts compatible with previously selected parts. It doesn't matter which part you select first or if you leave slots empty, or change a decision after selecting more parts. You can unlock parts by selecting the empty option from the dropdown. 

I had a few thoughts about using filterFilter but in the end used a few forEach loops. 

Also, you get a preview of the part you've just selected on the right, or below on mobile. I mean to find a better way to browse parts from this page so you know what you're clicking on, perhaps show the price of the part in the menu.

#### Edit page

This page, for now, serves as a record of the previous validation method. The edit form works in a slightly different way to the new machine form, so it was not easy to convert, I don't have time right now, the form does work, and I suppose it might even be easier to delete a rig with mistakes and make a new one?

#### Notes 

Like I noted earlier, I mean to flesh out all of the views with more information about the products, but for the moment, it demonstrates the framework laid down to make additions easy. 

I think the new computer form works properly, the only bugs I've found happen because I made mistakes in the seeds file, also top priority. 

## Code excerpts and notes

I made a nice constant variable containing a regular expression to validate the email fields. I also made use of $rootScope to broadcast messages. 

If you've ever seen an angular app, you already know what most of the code looks like.


This code comes from the page displaying details about a machine, showing the use of uib-tabs with ng-repeat and a custom directive.

```
<uib-tabset>
  <uib-tab heading="Overview">
    <h1 class="md-display-2">Overview</h1>
    <div class="row">
      <partcards partlist="rigs.rig.parts"></partcards>
    </div>
  </uib-tab>

  <uib-tab heading="{{part.parttypes[0].parttype}}" ng-repeat="part in rigs.rig.parts track by $index">
    <parttab part="part" showlinks="true"></parttab>
  </uib-tab>
</uib-tabset>

```

This code is from the new computer controller, it is part of the process which lets me change the dropdown options, controlled using a promise chain.

I mean to refactor this, which I'm sure can be done. 

```
  vm.collectIncompatibilities = () => {
    vm.partsNotAllowed = [];
    vm.partIds.filter(Boolean).forEach(id => {
      Part.get({id: id}).$promise
      .then(part => {
        part.incompatibilities.forEach(incompatibility => {
          vm.partsNotAllowed.push(incompatibility.id);
        });
      })
      .then(() => {
        vm.types.forEach(type => {
          vm.filteredParts[type.parttype].parts = type.parts.map(part => {
            if(vm.partsNotAllowed.indexOf(part.id) < 0) {
              return part;
            }
          }).filter(Boolean);
        });
        vm.refreshTypes();
      });
    });
  };

```

## Future plans

Fleshing out the information about parts, adding some more pictures etc.

I mean to add a great many parts too the seeds file, though that would mean SO MUCH seeding incompatibilities, like hundred of lines of unreadable code. I'll still do it.  

I wondered about seperating by manufacturer like on the pcspecialist website, but with the form filtering, I don't think I need to do that. 

Refactoring the form filtering, it works, but it seems a little long winded, perhaps I haven't made use of some method that will make it much simpler. 

I've used a simple minimal design and I haven't animated much, I want to work some more on it, or perhaps come up with something else, but it's not my strong suit. 

Get heroku to work.