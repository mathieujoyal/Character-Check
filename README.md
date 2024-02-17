# Character-Check

Welcome to character check! This project is a website to facilitate Dnd 5th edition character sheet managing. I have no intention on making this website a paid service at the moment.
Unless a lot of progress is made on the site where there are features that could be paid for, the core uses of the site will remain free. Any revenue would be from ads on the side or bottom, official
affiliation and donations, if ever.

## The Calculator

This is a Calculator for D&D 5th edition that uses the most populator character stats building logic known as: Point buy. The way it works is that all 6 "Ability", "attributes" or "stats" (strength, dexterity, constitution, intelligence, wisdom and charisma"), start at a base of 8 and cannot be lowered more than that nor can it be increased to more than 15 when creating a character. (This is subject to change depending on who the user is playing with but since this is a majorly accepted rule in the universe of Dungeons and dragons (D&D), this website uses that restriction.) The users can then add or subtract points to any attribute they wish to increase/decrease as they wish until they have spent all 27 of their starting points. (Again, this rule is  subject to change but 27 is the normally accepted number as rules stand but as i mentionned, depending on who the user is playing with. This website sticks to the most commonly accepted rules.) If an attribute/stat is at 13 and is increased to 14 or if it is at 14 and increased to 15, then the remaining points is lowered by 2 instead of 1. Revesersably, if it is at 15  and it is decreased to 14 or if it is at 14 and is decreased to 13, then the remaining points will go up by 2 instead of 1.

The Ability Modifier is a very important number to keep in mind when creating a character. Most people rely on THAT specific

Number/concept in focus and base their entire point spending around it. At the base of 8, the modifier is -1. The modifier 

then becomes 0 when the stat is at 10, it becomes +1 when it reaches 12, +2 when it reaches 14, at 16 it is +3, ect..
This number influences the majority of the character sheet's values and how the game is then played for this user.

It takes into concideration a number of variables. The starting number of 8 ( that base rule i was talking about again), then adds whatever bonus are granted by the selected race ( and sometimes subrace ) and then finally add the number of points added by the user using the point buy system. It then calculates that Ability modifer that i mentioned earlier. It is important to note that the bonus points obtained from your race are added at the end and do not influence the "price" of the point buy system. They do influence the end result of the modifer nonetheless.

## The Sheet Making/using

All the information entered on the form are stored on the backend under a collection with a matching id to the user who made the sheet. This makes it so only the creator of the sheet is able to access it and then modify it after loading it. the information modified are then patched in over the old ones and the sheet is updated on mongo directly. This facilitates the use of the character sheet which need to be constantly used during play and constantly adjusted as the game progresses. As of right now, the sheet is fully useable but there are many more features that i plan on adding. For exemple, better interface for the inventory,, the weapon actions and character traits/feature that have a number of uses per long/short rests. Also i plan on adding a full encyclopedia of spells, reatures, classes, races, subraces, subclasses, items, creatures, ect..

As of right now, this is a form that needs to be filled out automatically. Later on, users will be able to use the calculator in conjonction with the sheet maker. in the sens that the values for character stats made in the calculator will be able to be used right away in the character stats section of the sheet form and all field that are relevant to these will be filled out automatically while still being adjustable for any case where any other object, traits or anything else influences those numbers.

The user can also view the list of sheets that they have and chose to delete them from the Sheetloader Component.

For what the components are at this moment, they are fully working and can already be a good upgrade from the pen and paper alternative for people who prefer a digital approach to their game sheets.

These components use mongo for storing the sheets in their own collection which is linked to the user who made the sheets. These sheets contain around 60 fields of information which are entered by the user, saved as a new character sheet on mongo and can then be loaded in the sheetloader components to then be either deleted from the user's account and sheet collection permanently or to be used to modify either during play or after outside of a game session. The information changed is patched onto the mongo sheet using the sheet ID and those changes are kept when the user comes back to the sheet later on.

## The login/registering

The users can register on this site easily by entering a username, password and email. The email has no use at the moment but a password/username recovery system will be implemented in the near future.
The password must be longer than 8 characters but shorter than 20. The security of the site is low at the moment but password encryption and stricter requirements for password and usernames will be added in the future.

As of right now, Users can make an account and delete said account from the home page. The deletion requires to type their username as confrimation and then confirm the deletion. It is stored and remove directly in the mongo account collection. 


## Things that will be done after Submiting:

- Encyclopedia
- Spells and slots
- inventory
- Stats be influenced by inventory and features automatically
- Better UI for sheet

### Things left to be done before submiting:

- make sure textareas are not resizeable