import React from 'react'

import ReactDOM from 'react-dom'
import clsx from 'clsx'

import { createRoot } from 'react-dom/client'

// Componente de seleção de assunto que será injetado no formulário
function SubjectSelect() {
  return (
    <select
      id="user-subject"
      defaultValue=""
      className={clsx(
        'block w-full rounded-lg bg-white/5 px-4 py-2 text-sm',
        'appearance-none focus:outline-none',
        '*:text-black',
        'cursor-pointer',

      )}
    >
      <option value="" disabled hidden>Selecione</option>
      <option value="Proposta de Trabalho">Proposta de Trabalho</option>
      <option value="Orçamento">Orçamento</option>
      <option value="Feedback">Feedback</option>
      <option value="Dúvida">Dúvida</option>
      <option value="Outro">Outro</option>
    </select>
  )
}

// Aguarda o DOM carregar e injeta o componente React
document.addEventListener('DOMContentLoaded', () => {
  const mountNode = document.getElementById('listbox')
  if (mountNode) {
    ReactDOM.render(<SubjectSelect />, mountNode)
  } else {
    console.error('⚠️ Container #listbox não encontrado no DOM.')
  }
})

export default SubjectSelect
