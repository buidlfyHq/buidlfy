import { decode as base64_decode } from "base-64";

const BuilderConfig = base64_decode(
  "eyJoZWFkIjp7InRpdGxlIjoiIiwibG9nbyI6IiJ9LCJiYWNrZ3JvdW5kIjp7InIiOiIwIiwiZyI6IjAiLCJiIjoiMCJ9LCJidWlsZGVyIjpbeyJuYW1lIjoiSGVhZGluZyAxIiwiaCI6MSwidmFsdWUiOiJIZWFkaW5nIDEiLCJsaW5rIjoiIiwic3R5bGUiOnsiYmFja2dyb3VuZENvbG9yIjp7InIiOiIwIiwiZyI6IjAiLCJiIjoiMCJ9LCJjb2xvciI6eyJyIjoiMCIsImciOiIwIiwiYiI6IjAiLCJhIjowLjV9LCJmb250V2VpZ2h0Ijoibm9ybWFsIiwiZm9udFN0eWxlIjoibm9ybWFsIiwidGV4dERlY29yYXRpb24iOiJub25lIiwianVzdGlmeUNvbnRlbnQiOiJjZW50ZXIiLCJmb250U2l6ZSI6MzAsImRlbGV0ZUNvbXBvbmVudCI6MCwibWFyZ2luIjp7Im1hcmdpbkxlZnQiOjAsIm1hcmdpblJpZ2h0IjowLCJtYXJnaW5Ub3AiOjAsIm1hcmdpbkJvdHRvbSI6MH0sInBhZGRpbmciOnsicGFkZGluZ0xlZnQiOjAsInBhZGRpbmdSaWdodCI6MCwicGFkZGluZ1RvcCI6MCwicGFkZGluZ0JvdHRvbSI6MH19LCJpIjoiMzJlblNpIiwieCI6MCwieSI6MCwidyI6NiwibWluVyI6MSwicmVzaXplSGFuZGxlcyI6WyJzZSJdfSx7Im5hbWUiOiJCdXR0b24iLCJoIjoxLCJ2YWx1ZSI6IkFkZCBCdXR0b24iLCJsaW5rIjoiIiwic3R5bGUiOnsiYmFja2dyb3VuZENvbG9yIjp7InIiOiIwIiwiZyI6IjAiLCJiIjoiMCJ9LCJjb2xvciI6eyJyIjoiMCIsImciOiIwIiwiYiI6IjAiLCJhIjoiMTAwIn0sImZvbnRXZWlnaHQiOiJub3JtYWwiLCJmb250U3R5bGUiOiJub3JtYWwiLCJ0ZXh0RGVjb3JhdGlvbiI6Im5vbmUiLCJqdXN0aWZ5Q29udGVudCI6ImNlbnRlciIsImZvbnRTaXplIjoxNSwiZGVsZXRlQ29tcG9uZW50IjowLCJib3JkZXJSYWRpdXMiOjAsImJvcmRlcldpZHRoIjowLCJzaGFkb3ciOiJub25lIiwibWFyZ2luIjp7Im1hcmdpbkxlZnQiOjAsIm1hcmdpblJpZ2h0IjowLCJtYXJnaW5Ub3AiOjAsIm1hcmdpbkJvdHRvbSI6MH0sInBhZGRpbmciOnsicGFkZGluZ0xlZnQiOjI0LCJwYWRkaW5nUmlnaHQiOjI0LCJwYWRkaW5nVG9wIjo4LCJwYWRkaW5nQm90dG9tIjo4fX0sImNvbm5lY3RXYWxsZXQiOiJvZmYiLCJjb250cmFjdCI6e30sImkiOiJib2FSQjYiLCJ4IjowLCJ5IjoxLCJ3Ijo2LCJtaW5XIjoxLCJyZXNpemVIYW5kbGVzIjpbInNlIl19LHsibmFtZSI6IkNvbnRhaW5lciIsImgiOjIsInN0eWxlIjp7ImRlbGV0ZUNvbXBvbmVudCI6MCwiYmFja2dyb3VuZENvbG9yIjp7InIiOiIwIiwiZyI6IjAiLCJiIjoiMCJ9LCJjb2xvciI6eyJyIjoiMCIsImciOiIwIiwiYiI6IjAiLCJhIjoiMTAwIn0sImJvcmRlclJhZGl1cyI6MCwiYm9yZGVyV2lkdGgiOjAsInNoYWRvdyI6Im5vbmUifSwiY2hpbGRyZW4iOltdLCJpIjoiRzVhVUw0IiwieCI6MCwieSI6MiwidyI6NiwibWluVyI6MSwibWluSCI6MSwicmVzaXplSGFuZGxlcyI6WyJlIl19LHsibmFtZSI6IkhlYWRpbmcgMiIsImgiOjEsInZhbHVlIjoiSGVhZGluZyAyIiwibGluayI6IiIsInN0eWxlIjp7ImJhY2tncm91bmRDb2xvciI6eyJyIjoiMCIsImciOiIwIiwiYiI6IjAifSwiY29sb3IiOnsiciI6IjAiLCJnIjoiMCIsImIiOiIwIiwiYSI6IjEwMCJ9LCJmb250V2VpZ2h0Ijoibm9ybWFsIiwiZm9udFN0eWxlIjoibm9ybWFsIiwidGV4dERlY29yYXRpb24iOiJub25lIiwianVzdGlmeUNvbnRlbnQiOiJjZW50ZXIiLCJmb250U2l6ZSI6MjQsImRlbGV0ZUNvbXBvbmVudCI6MCwibWFyZ2luIjp7Im1hcmdpbkxlZnQiOjAsIm1hcmdpblJpZ2h0IjowLCJtYXJnaW5Ub3AiOjAsIm1hcmdpbkJvdHRvbSI6MH0sInBhZGRpbmciOnsicGFkZGluZ0xlZnQiOjAsInBhZGRpbmdSaWdodCI6MCwicGFkZGluZ1RvcCI6MCwicGFkZGluZ0JvdHRvbSI6MH19LCJpIjoiSE5kS201IiwieCI6MCwieSI6NCwidyI6NiwibWluVyI6MSwicmVzaXplSGFuZGxlcyI6WyJzZSJdfV0sImNvbnRyYWN0Ijp7ImFiaSI6W10sImFkZHJlc3MiOiIifX0="
);
export default BuilderConfig;
