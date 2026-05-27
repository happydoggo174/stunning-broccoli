export function calculate(expr, vars = {}) {
  // Tokenize expression
  const tokens = expr.match(
    /\s*([A-Za-z_]\w*|\d+(\.\d+)?|[()+\-*/])\s*/g
  )?.map(t => t.trim());

  if (!tokens) {
    throw new Error("Invalid expression");
  }

  let pos = 0;

  function peek() {
    return tokens[pos];
  }

  function consume() {
    return tokens[pos++];
  }

  // Grammar:
  // expression -> term ((+|-) term)*
  // term       -> factor ((*|/) factor)*
  // factor     -> NUMBER | VARIABLE | "(" expression ")" | unary
  // unary      -> "-" factor

  function parseExpression() {
    let value = parseTerm();

    while (peek() === "+" || peek() === "-") {
      const op = consume();
      const right = parseTerm();

      if (op === "+") value += right;
      else value -= right;
    }

    return value;
  }

  function parseTerm() {
    let value = parseFactor();

    while (peek() === "*" || peek() === "/") {
      const op = consume();
      const right = parseFactor();

      if (op === "*") value *= right;
      else{
        if(right==0){
            throw new Error("can't divide by zero");
        }
        value /= right;
        }
    }

    return value;
  }

  function parseFactor() {
    const token = peek();

    if (token === "-") {
      consume();
      return -parseFactor();
    }

    if (token === "(") {
      consume();

      const value = parseExpression();

      if (consume() !== ")") {
        throw new Error("Missing closing parenthesis");
      }

      return value;
    }

    consume();

    // Number
    if (!isNaN(token)) {
      return parseFloat(token);
    }

    // Variable
    if (token in vars) {
      return Number(vars[token]);
    }

    throw new Error(`Unknown variable: ${token}`);
  }

  const result = parseExpression();

  if (pos < tokens.length) {
    throw new Error(`Unexpected token: ${peek()}`);
  }

  return result;
}