class View {
    constructor() {
        this.transactionsList = document.getElementById('transactions-list');
        this.totalBalance = document.getElementById('total-balance');
        this.typeFilterSelect = document.getElementById('type-filter');
        this.categoryFilterSelect = document.getElementById('category-filter');
    }
    
    resetForm() {
        this.form = document.getElementById('transaction-form');
        this.typeSelect = this.form.querySelector('#type');
        this.categorySelect = this.form.querySelector('#category');
        this.amountInput = this.form.querySelector('#amount');
        
        this.typeSelect.value = '';
        this.categorySelect.value = '';
        this.amountInput.value = '';
    }

    renderTransactions(transactions) {
         this.transactionsList.innerHTML = '';
        transactions.forEach(transaction => {
            const transactionElement = document.createElement('div');
            transactionElement.classList.add('transaction', transaction.type);

            transactionElement.innerHTML = `
                <span>${transaction.category}</span>
                <span>${transaction.type === 'income' ? 'Доход' : 'Расход'}</span>
                <span>${transaction.amount} руб.</span>
                <span class="delete-button" data-id="${transaction.id}">&times;</span>
            `;
            this.transactionsList.appendChild(transactionElement);
             const deleteButton = transactionElement.querySelector('.delete-button');
             deleteButton.addEventListener('click', (event) => this.handleDeleteTransaction(event));
        });
    }
    
    handleDeleteTransaction(event) {
        const id = parseInt(event.target.dataset.id);
        this.onDeleteTransaction(id)
    }

    renderBalance(balance) {
        this.totalBalance.textContent = balance;
    }
    
    bindDeleteTransaction(handler) {
      this.onDeleteTransaction = handler
    }
}