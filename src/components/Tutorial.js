import moment from 'moment';



const tutorial = [
    {
        id: 1,
        completed: true,
        description: 'I am a completed todo (I cannot get any changes or edits done unless the left side checkbox gets unmarked)',
        createdAt: moment().unix(),
        updatedAt: null,
        extendedDescription: 'You can display me and my completed siblings on the bottom of the screen by pressing the "Completed bottom" button so we will not bother you but you can still keep track of us. ;) ',
        deadline: undefined,
        isPriority: false
    },
    {
        id: 2,
        completed: false,
        description: 'I am a prioritized todo (I will always get displayed in the top side of the container as I am the most important :)',
        createdAt: moment().unix(),
        updatedAt: null,
        extendedDescription: ' ',
        deadline: undefined,
        isPriority: true
    },
    {
        id: 3,
        completed: false,
        description: 'I am just an average todo. Check my extended description to know more about the app!',
        createdAt: moment().unix(),
        updatedAt: null,
        extendedDescription: "This is a demo todo that you will see the first time you enter the app. On every todo, you have multiple possiblities to interract with the app. You can choose to mark the todo as completed by checking the left side checkbox, to edit the todo by clicking on it's description and typing another word, to erase the todo from your list by clicking on the right side bin icon, to open the todo's list by clicking on the list icon or to prioritize your todo by clicking on the pin icon. You may also see that you can choose a deadline anytime in the future by selecting any day from the below displayed calendar. Once the modal will get closed, your changes will be saved! I hope this app will help you be more organized. :D",
        deadline: undefined,
        isPriority: false
    }
]


export default tutorial;