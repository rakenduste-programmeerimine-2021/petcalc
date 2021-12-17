import { render, screen } from '@testing-library/react';
import Form from './components/Form';
import Calculator from './components/Calculator';

test('vorm test', () => {
  render(<Form />);

  const q1 = screen.getByText(/Mis on looma liik?/i);
  const q2 = screen.getByText(/Mis on looma vanus?/i);
  const q3 = screen.getByText(/Mitu min on sul kindlasti iga päeva hommikul vaba aega tegeleda loomaga?/i);
  const q4 = screen.getByText(/Mitu min on sul kindlasti iga päeva õhtul vaba aega tegeleda loomaga?/i);
  const q5 = screen.getByText(/Mitu min on sul kindlasti iga päeva keskel vaba aega tegeleda loomaga?/i);
  const q6 = screen.getByText(/Mitu h nädalas saad sa lisaks loomaga tegeleda?/i);
  const q7 = screen.getByText(/Mitu päeva kuus keskmiselt oled sa kodust eemal?/i);
  const q8 = screen.getByText(/Kui palju raha saad sa kuus loomale kulutada?/i);
  const is = screen.queryAllByText(/input/i);

  expect(q1).toBeInTheDocument();
  expect(q2).toBeInTheDocument();
  expect(q3).toBeInTheDocument();
  expect(q4).toBeInTheDocument();
  expect(q5).toBeInTheDocument();
  expect(q6).toBeInTheDocument();
  expect(q7).toBeInTheDocument();
  expect(q8).toBeInTheDocument();
  expect(is.length).toBe(9);
});


test('kalkulaator test1', () => {
  
  render(<Calculator species="Spider" age="10" minInMorning="50" minInEvening="50" minInDay="50" hInWeek="12" dInMonth="6" moneyInMonth="200" />);

  const result = screen.getByText(/true/i);

  expect(result).toBeInTheDocument();
});

test('kalkulaator test2', () => {
  
  render(<Calculator species="Spider" age="10" minInMorning="50" minInEvening="20" minInDay="50" hInWeek="12" dInMonth="6" moneyInMonth="200" />);

  const result = screen.getByText(/false/i);

  expect(result).toBeInTheDocument();
});

test('kalkulaator test3', () => {
  
  render(<Calculator species="Spider" age="3" minInMorning="50" minInEvening="50" minInDay="50" hInWeek="12" dInMonth="6" moneyInMonth="200" />);

  const result = screen.getByText(/false/i);

  expect(result).toBeInTheDocument();
});

test('login test', () => {
  
  const email = screen.getByText(/Email:/i);
  const password = screen.getByText(/Password:/i);
  const is = screen.queryAllByText(/input/i);

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(is.length).toBe(9);
});

test('register test', () => {
  
  const email = screen.getByText(/Email:/i);
  const password = screen.getByText(/Password:/i);
  const cpassword = screen.getByText(/Confirm password:/i);
  const sq = screen.getByText(/Security question:/i);
  const sa = screen.getByText(/Security answer:/i);
  const is = screen.queryAllByText(/input/i);

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(cpassword).toBeInTheDocument();
  expect(sq).toBeInTheDocument();
  expect(sa).toBeInTheDocument();
  expect(is.length).toBe(9);
});