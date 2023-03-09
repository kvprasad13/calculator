

function hasPrecedence(char) {
  if (char === "/") {
    return 3;
  }
  if (char === "*") return 2;
  // no need for else because automatically + and -
  return 1;
}
function applyOp(operator, operand_1, operand_2) {
  operand_1 = parseInt(operand_1);
  operand_2 = parseInt(operand_2);
  if (operator === "+") {
    return operand_1 + operand_2;
  } else if (operator === "-") {
    return operand_1 - operand_2;
  } else if (operator === "*") {
    return operand_1 * operand_2;
  } else return operand_1 / operand_2;
}
function evaluate(expression) {
  let stack_operators = [];
  let stack_operands = [];
  let haveDigit = true;
  [...expression].forEach(function (char) {
    str = "" + char;
    // if (str.toUpperCase() != str.toLowerCase()) {
    //   return "Invalid";
    // }
    // console.log(char);
    if (char >= "0" && char <= "9") {
      if (stack_operands.length === 0 || haveDigit === false)
        stack_operands.push(char);

      else {
        let top = stack_operands[stack_operands.length - 1];
        stack_operands.pop();
        top += char;
        stack_operands.push(top);
      }
      haveDigit = true;
    }

    else if (
      char === "*" ||
      char === "-" ||
      char === "+" ||
      char === "/"
    ) {
      haveDigit = false;

      // if (stack_operands.length == 0) return NaN;
      while (
        stack_operators.length > 0 &&
        hasPrecedence(
          stack_operators[stack_operators.length - 1]
        ) >= hasPrecedence(char)
      ) {
        const ans = applyOp(
          stack_operators[stack_operators.length - 1],
          stack_operands[stack_operands.length - 2],
          stack_operands[stack_operands.length - 1]
        );
        stack_operands.pop();
        stack_operands.pop();
        stack_operators.pop();
        stack_operands.push(ans);
      }
      stack_operators.push(char);
    }
    else return "Invalid";
  });
  let len = stack_operators.length;
  while (len > 0) {
    const ans = applyOp(
      stack_operators[stack_operators.length - 1],
      stack_operands[stack_operands.length - 2],
      stack_operands[stack_operands.length - 1]
    );
    stack_operands.pop();
    stack_operands.pop();
    stack_operators.pop();
    stack_operands.push(ans);
    len -= 1;
  }

  const expression_value = stack_operands[0];
  stack_operands.pop();
  if (stack_operands != 0 || stack_operators != 0) return "Invalid";
  return expression_value;
}
// controller section 
// start
function addTo(button_value) {
  let element = document.getElementById('infix_expression').value;


  render(element + button_value);


}
function getTextboxValue() {
  const textbox = document.getElementById("infix_expression");
  const evaluated_expression = evaluate(textbox.value);
  if (Number.isNaN(evaluated_expression)) {
    render("Invalid");
  } else {
    render(evaluated_expression);
  }
}
// end

//view section
// start
function render(element_tobe_displayed) {
  document.getElementById("infix_expression").value =
    element_tobe_displayed;
}

// end