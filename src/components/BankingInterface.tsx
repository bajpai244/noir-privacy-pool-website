
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DollarSign, TrendingUp, TrendingDown, Clock, Monitor } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: Date;
  description: string;
}

const BankingInterface = () => {
  const [balance, setBalance] = useState(1000.00);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'deposit',
      amount: 500,
      date: new Date(Date.now() - 86400000),
      description: 'Initial deposit'
    }
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [terminalText, setTerminalText] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const text = 'RETRO-BANK TERMINAL v2.1 READY...';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        setTerminalText(text.slice(0, i + 1));
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    typeWriter();
  }, []);

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (depositAmount > 0) {
      setBalance(prev => prev + depositAmount);
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'deposit',
        amount: depositAmount,
        date: new Date(),
        description: `Deposit via terminal`
      };
      setTransactions(prev => [newTransaction, ...prev]);
      setAmount('');
    }
  };

  const handleWithdrawal = () => {
    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > 0 && withdrawAmount <= balance) {
      setBalance(prev => prev - withdrawAmount);
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'withdrawal',
        amount: withdrawAmount,
        date: new Date(),
        description: `Withdrawal via terminal`
      };
      setTransactions(prev => [newTransaction, ...prev]);
      setAmount('');
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="min-h-screen bg-background retro-crt p-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="terminal-text text-4xl md:text-6xl font-bold text-primary mb-2 glitch">
          ░R░E░T░R░O░-░B░A░N░K░
        </div>
        <div className="terminal-text text-lg text-accent">
          {terminalText}<span className="blink">█</span>
        </div>
        <div className="terminal-text text-sm text-muted-foreground mt-2">
          System Time: {formatTime(currentTime)}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Account Balance */}
        <Card className="retro-card col-span-full lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="terminal-text text-xl font-bold text-primary">ACCOUNT BALANCE</h2>
            <DollarSign className="text-accent" size={24} />
          </div>
          <div className="terminal-text text-3xl font-bold text-accent mb-2">
            {formatCurrency(balance)}
          </div>
          <div className="text-sm text-muted-foreground">
            Available Funds
          </div>
        </Card>

        {/* Transaction Interface */}
        <Card className="retro-card col-span-full lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="terminal-text text-xl font-bold text-primary">TRANSACTION TERMINAL</h2>
            <Monitor className="text-accent" size={24} />
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="terminal-text text-sm font-bold text-primary block mb-2">
                AMOUNT ($)
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="retro-input terminal-text text-lg"
                step="0.01"
                min="0"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleDeposit}
                disabled={!amount || parseFloat(amount) <= 0}
                className="retro-button bg-primary hover:bg-primary/90"
              >
                <TrendingUp className="mr-2" size={20} />
                DEPOSIT
              </Button>
              
              <Button
                onClick={handleWithdrawal}
                disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
                className="retro-button bg-destructive hover:bg-destructive/90 border-destructive"
                style={{ 
                  boxShadow: '4px 4px 0px hsl(var(--destructive))',
                }}
              >
                <TrendingDown className="mr-2" size={20} />
                WITHDRAW
              </Button>
            </div>
          </div>
        </Card>

        {/* Transaction History */}
        <Card className="retro-card col-span-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="terminal-text text-xl font-bold text-primary">TRANSACTION HISTORY</h2>
            <Clock className="text-accent" size={24} />
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {transactions.length === 0 ? (
              <div className="terminal-text text-muted-foreground text-center py-8">
                NO TRANSACTIONS FOUND
              </div>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-input border border-border"
                >
                  <div className="flex items-center space-x-3">
                    {transaction.type === 'deposit' ? (
                      <TrendingUp className="text-primary" size={20} />
                    ) : (
                      <TrendingDown className="text-destructive" size={20} />
                    )}
                    <div>
                      <div className="terminal-text font-bold">
                        {transaction.type.toUpperCase()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {transaction.description}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`terminal-text font-bold ${
                      transaction.type === 'deposit' ? 'text-primary' : 'text-destructive'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatTime(transaction.date)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center terminal-text text-sm text-muted-foreground">
        <div className="mb-2">
          ░░░ SECURE CONNECTION ESTABLISHED ░░░
        </div>
        <div>
          © 2024 RETRO-BANK SYSTEMS • ALL TRANSACTIONS ENCRYPTED
        </div>
      </div>
    </div>
  );
};

export default BankingInterface;
