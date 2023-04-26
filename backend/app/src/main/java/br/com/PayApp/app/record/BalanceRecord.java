package br.com.PayApp.app.record;

import java.math.BigDecimal;

public record BalanceRecord(BigDecimal balance, String accountNumber) {}
