import FormContainer from "./view/form-container.js";
import { render } from "./framework/render.js"
class Presenter {
    constructor(model, view, formContainer) {
        this.model = model;
        this.view = view;
        this.formContainer = formContainer;
        
         this.formContainer.setFormSubmitHandler((type, category, amount) => this.handleAddTransaction(type, category, amount))


        this.view.typeFilterSelect.addEventListener('change', () => this.handleFilter());
        this.view.categoryFilterSelect.addEventListener('change', () => this.handleFilter());
        
        this.view.bindDeleteTransaction((id) => this.handleDeleteTransaction(id))


        this.updateView();
    }

    handleAddTransaction(type, category, amount) {

        if (!type) {
          alert('Пожалуйста, выберите тип операции.');
          return;
         }

        if (!category) {
          alert('Пожалуйста, выберите категорию.');
          return;
        }
        
        const parsedAmount = parseFloat(amount)

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            alert('Пожалуйста, введите положительное число в поле "Сумма".');
            return;
        }

        this.model.addTransaction(type, category, parsedAmount);
        this.view.resetForm();
        this.updateView();

    }

    handleFilter() {
        const typeFilter = this.view.typeFilterSelect.value;
        const categoryFilter = this.view.categoryFilterSelect.value;
        const filteredTransactions = this.model.filterTransactions(typeFilter, categoryFilter);
        this.view.renderTransactions(filteredTransactions);
    }
    
    handleDeleteTransaction(id){
        this.model.deleteTransaction(id);
        this.updateView()
    }


    updateView() {
        const transactions = this.model.getTransactions();
        this.view.renderTransactions(transactions);
        this.updateBalance();
    }

    updateBalance() {
        const transactions = this.model.getTransactions();
        const totalBalance = transactions.reduce((acc, transaction) => {
            return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
        }, 0);
        this.view.renderBalance(totalBalance.toFixed(2));
    }
}

// Инициализация приложения
const model = new Model();
const view = new View();
const formContainer = new FormContainer()
const presenter = new Presenter(model, view, formContainer);
const formContainerElement = document.querySelector(".form-container");
render(formContainer, formContainerElement)