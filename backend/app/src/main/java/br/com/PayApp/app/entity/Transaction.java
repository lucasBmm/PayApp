package br.com.PayApp.app.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import br.com.PayApp.app.services.TransactionService;
import jakarta.persistence.*;

@Entity
@Table(name = "Transactions")
public class Transaction {

    public Transaction(Account fromAccount, Account toAccount, BigDecimal amount, TransactionType transactionType) {
        this.amount = amount;
        this.destinationAccount = toAccount;
        this.sourceAccount = fromAccount;
        this.type = transactionType;
    }

    public Transaction () {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private TransactionType type;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(name = "transaction_date", nullable = false)
    private LocalDateTime transactionDate;

    @ManyToOne
    @JoinColumn(name = "source_account_id", nullable = false)
    private Account sourceAccount;

    @ManyToOne
    @JoinColumn(name = "destination_account_id", nullable = false)
    private Account destinationAccount;

    @PrePersist
    public void prePersist() {
        transactionDate = LocalDateTime.now();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", type=" + type +
                ", amount=" + amount +
                ", transactionDate=" + transactionDate +
                '}';
    }
}