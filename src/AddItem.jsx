import React from 'react'
import { FaPlus } from 'react-icons/fa'

const AddItem = ( {newItem , setNewItem , handleSubmit}) => {
  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor="add item">Add Item</label>
        <input  autoFocus value={newItem} onChange={(e) => setNewItem(e.target.value)}
        type="text"  id="addItem" placeholder='Add Items' required />
        <button type='summit'  aria-label='add item'> <FaPlus /> </button>

    </form>
    
  )
}

export default AddItem