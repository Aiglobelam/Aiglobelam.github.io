// JS engine work on "tasks" that recides in the "Task Queue"

// When a task is done by for ex an external API call the JS engine is notified that the API call has finished.
// This is done in the way that the "callback function" that was given to the API call is pushed on to the “Task Queue”.

// * Task Queue
// A collection of completed async tasks
// whose callback functions are ready to be executed and 
// pushed onto the call stack.


//  How does a function get from the Task Queue onto the Call Stack?
// * Call Stack => The task
// When the call stack is empty, the JS engine will look to the "Task Queue"
// to see if there are any functions that need to be executed and pushed onto the call stack. 