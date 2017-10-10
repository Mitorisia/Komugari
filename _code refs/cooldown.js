/*
    Example by ItsJordan#4297
    Adds a cooldown to your commands so the user will have to wait 2.5 seconds between each command.
    This code is only meant to be an example and not used without being edited.

    REMINDER: <Message> is what you defined in the <Client>.on('message') event.
*/

let talkedRecently = new Set();

// Checks if they have talked recently
if (talkedRecently.has(<Message>.author.id)) {
  /* 
   You can change the nature of the cool down by changing the return to something else. 
   REMINDER: You may need to add an else statement if you do not have any returns in this scope.
  */
  return;
}
// Adds the user to the set so that they can't talk for 2.5 seconds
talkedRecently.add(<Message>.author.id);
setTimeout(() => {
  // Removes the user from the set after 2.5 seconds
  talkedRecently.delete(<Message>.author.id);
}, 2500);