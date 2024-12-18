import { createElement } from "../framework/render.js";

function createFormContainerTemplate() {
  return `<div class="form-container">
            <form id="transaction-form">
                <select id="type" required>
                    <option value="">Выберите тип операции</option>
                    <option value="income">Доход</option>
                    <option value="expense">Расход</option>
                </select>

                <select id="category" required>
                    <option value="">Выберите категорию</option>
                    <option value="salary">Зарплата</option>
                    <option value="food">Еда</option>
                    <option value="transport">Транспорт</option>
                    <option value="entertainment">Развлечения</option>
                </select>

                <input type="number" id="amount" placeholder="Сумма" >
                
                <button type="submit">Добавить операцию</button>
            </form>
        </div>`;
}

export default class FormContainer {
  constructor() {
    this.formSubmitHandler = null;
  }
    
  getTemplate() {
    return createFormContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.form = this.element.querySelector("#transaction-form");
        this.form.addEventListener("submit", (event) => this.#formSubmitHandler(event));
    }

    return this.element;
  }
    
    #formSubmitHandler(event) {
        event.preventDefault();
      if(this.formSubmitHandler){
           const type = this.form.querySelector('#type').value;
           const category = this.form.querySelector('#category').value;
           const amount = this.form.querySelector('#amount').value;
            
         this.formSubmitHandler(type, category, amount);
      }
    }
    
    setFormSubmitHandler(callback){
        this.formSubmitHandler = callback;
    }


  removeElement() {
    this.element = null;
  }
}