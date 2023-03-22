# Plan 5 loan calculator

# Constants
AVERAGE_RPI = 0.032
AVERAGE_CPI = 0.026
REPAY_RATE = 0.09

loanRemaining = int(input("Loan amount: "))
salary = int(input("Starting salary: "))
salaryIncrease = int(input("Salary increase: "))
salaryGrowth = float(input("Salary growth: "))
numYears = 0
threshold = 25000

while loanRemaining > 0:
    numYears = numYears + 1

    # Increase loan, salary, and the threshold
    loanRemaining = loanRemaining + loanRemaining * AVERAGE_RPI
    salary = salary + salaryIncrease + salary * salaryGrowth
    threshold = threshold + threshold * AVERAGE_CPI

    # Repay part of the loan
    if salary > threshold:
        loanRemaining = loanRemaining - (salary - threshold) * REPAY_RATE

print("Final salary: " + str(salary))
print("Number of years (note max is 40): " + str(numYears))