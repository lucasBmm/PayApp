package br.com.PayApp.app.record;

import br.com.PayApp.app.entity.TransactionType;

import java.math.BigDecimal;
import java.util.Objects;

public record TransactionRequest(
        Long sourceAccount,
        Long destinationAccount,
        BigDecimal amount,
        TransactionType transactionType) {

    public TransactionRequest {
        Objects.requireNonNull(sourceAccount, "toAccountNumber must not be null");
        Objects.requireNonNull(destinationAccount, "fromAccountNumber must not be null");
        Objects.requireNonNull(amount, "amount must not be null");
        Objects.requireNonNull(transactionType, "transactionType must not be null");
    }
}
