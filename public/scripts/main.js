import Modal from './modal.js'

const modal = Modal()
const modalTittle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')
const checkButtons = document.querySelectorAll('.actions a.check')
const copyButtons = document.querySelectorAll('.copyButton')
const readButtons = document.querySelectorAll('#readActionA')
const readButtonsImages = document.querySelectorAll('#readActionImage')

checkButtons.forEach(button => {
  button.addEventListener('click', handleClick)
})

async function execCopy() {
  let copyText = document.querySelector('#copyText').value
  await navigator.clipboard.writeText(copyText)
}

copyButtons.forEach(button => {
  button.addEventListener('click', execCopy)
})

const deleteButtons = document.querySelectorAll('.actions .delete')

deleteButtons.forEach(button => {
  button.addEventListener('click', event => handleClick(event, false))
})

function handleClick(event, check = true) {
  event.preventDefault()
  const slug = check ? 'check' : 'delete'
  const roomId = document.querySelector('#room-id').dataset.id
  const form = document.querySelector('.modal form')
  const questionId = event.target.dataset.id
  const inputModal = document.querySelector('.modal-wrapper .modal input')
  form.setAttribute('action', `/pergunta/${roomId}/${questionId}/${slug}`)
  modalTittle.innerHTML = check ? 'Marcar como lida' : 'Excluir esta pergunta'
  modalDescription.innerHTML = check
    ? 'Tem certeza que você deseja marcar esta pergunta como lida?'
    : 'Tem certeza que você deseja excluir esta pergunta?'
  modalButton.innerHTML = check ? 'Sim, marcar como lida' : 'Sim, excluir'
  check ? modalButton.classList.remove('red') : modalButton.classList.add('red')
  modal.open()
  check
    ? (inputModal.style.width = 'min(' + 70 + '%,' + 38.589 + 'rem)')
    : (inputModal.style.width = 'min(' + 70 + '%,' + 30.2 + 'rem)')
}

readButtons.forEach(button => button.addEventListener('mouseover', hoverButton))

readButtons.forEach(button =>
  button.addEventListener('mouseout', notHoverButton)
)

readButtonsImages.forEach(button =>
  button.addEventListener('mouseover', hoverButton)
)

readButtonsImages.forEach(button =>
  button.addEventListener('mouseout', notHoverButton)
)

function hoverButton() {
  document.getElementById('readActionA').innerHTML = 'Excluir'
  document
    .getElementById('readActionImage')
    .setAttribute('src', '/images/trash.svg')
}

function notHoverButton() {
  document.getElementById('readActionA').innerHTML = 'Pergunta lida'
  document
    .getElementById('readActionImage')
    .setAttribute('src', '/images/check.svg')
}
