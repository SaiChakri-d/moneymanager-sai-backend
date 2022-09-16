export const updateBudget = async (operations, user, amount) => {
  if (operations?.type === "income") {
    const budgetNumber = Number(user.budget) + amount;

    const budgetString = budgetNumber.toString();

    try {
      user.budget = budgetString;
      await user.save();
    } catch (error) {
      console.log(error);
    }
  } else {
    const budgetNumber = Number(user.budget) - amount;

    const budgetString = budgetNumber.toString();

    try {
      user.budget = budgetString;
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateBudgetWhenDelete = async (operations, user, amount) => {
  if (operations?.type === "income") {
    const budgetNumber = Number(user.budget) - Number(amount);

    const budgetString = budgetNumber.toString();

    try {
      user.budget = budgetString;
      await user.save();
    } catch (error) {
      console.log(error);
    }
  } else {
    const budgetNumber = Number(user.budget) + Number(amount);

    const budgetString = budgetNumber.toString();

    try {
      user.budget = budgetString;
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }
};
