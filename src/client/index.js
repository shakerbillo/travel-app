
import { handleClick } from './js/app'

import './styles/styles.scss'


const button = document.getElementById('button');
// // Event listener to add function to existing HTML DOM element
button.addEventListener('click', handleClick);



// alert('I exist!')


export{handleClick}