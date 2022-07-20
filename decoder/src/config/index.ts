import { decode as base64_decode } from "base-64";

const BuilderConfig = base64_decode(
  "eyJidWlsZGVyIjpbeyJuYW1lIjoiQnV0dG9uIiwiaCI6MSwidmFsdWUiOiJBZGQgQnV0dG9uIiwibGluayI6IiIsInN0eWxlIjp7ImNvbG9yIjp7InIiOiIwIiwiZyI6IjAiLCJiIjoiMCIsImEiOiIxMDAifSwiYmFja2dyb3VuZENvbG9yIjp7InIiOiIwIiwiZyI6IjAiLCJiIjoiMCJ9LCJmb250V2VpZ2h0Ijoibm9ybWFsIiwiZm9udFN0eWxlIjoibm9ybWFsIiwidGV4dERlY29yYXRpb24iOiJub25lIiwianVzdGlmeUNvbnRlbnQiOiJjZW50ZXIiLCJmb250U2l6ZSI6MTUsImRlbGV0ZUNvbXBvbmVudCI6MCwiYm9yZGVyUmFkaXVzIjoxLCJzaGFkb3ciOiJub25lIn0sImNvbm5lY3RXYWxsZXQiOiJvZmYiLCJjb250cmFjdCI6eyJtZXRob2ROYW1lIjoiY3JlYXRlQ2FtcGFpZ24iLCJzdGF0ZU11dGFiaWxpdHkiOiJub25wYXlhYmxlIiwiaW5wdXRzIjpbeyJpZCI6ImxOczEyaSIsInNlbmQiOmZhbHNlfV0sIm91dHB1dHMiOltdfSwiaSI6Ik41S2dWcCIsIngiOjAsInkiOjAsInciOjYsIm1pblciOjF9LHsibmFtZSI6IklucHV0IiwiaCI6MSwic3R5bGUiOnsiZGVsZXRlQ29tcG9uZW50IjowLCJib3JkZXJSYWRpdXMiOjEsInNoYWRvdyI6Im5vbmUiLCJjb2xvciI6eyJyIjoiMCIsImciOiIwIiwiYiI6IjAiLCJhIjoiMTAwIn19LCJpIjoibE5zMTJpIiwieCI6MCwieSI6MSwidyI6NiwibWluVyI6MX0seyJuYW1lIjoiQnV0dG9uIiwiaCI6MSwidmFsdWUiOiJBZGQgQnV0dG9uIiwibGluayI6IiIsInN0eWxlIjp7ImNvbG9yIjp7InIiOiIwIiwiZyI6IjAiLCJiIjoiMCIsImEiOiIxMDAifSwiYmFja2dyb3VuZENvbG9yIjp7InIiOiIwIiwiZyI6IjAiLCJiIjoiMCJ9LCJmb250V2VpZ2h0Ijoibm9ybWFsIiwiZm9udFN0eWxlIjoibm9ybWFsIiwidGV4dERlY29yYXRpb24iOiJub25lIiwianVzdGlmeUNvbnRlbnQiOiJjZW50ZXIiLCJmb250U2l6ZSI6MTUsImRlbGV0ZUNvbXBvbmVudCI6MCwiYm9yZGVyUmFkaXVzIjoxLCJzaGFkb3ciOiJub25lIn0sImNvbm5lY3RXYWxsZXQiOiJvZmYiLCJjb250cmFjdCI6eyJtZXRob2ROYW1lIjoiZ2V0RGVwbG95ZWRDYW1wYWlnbnMiLCJzdGF0ZU11dGFiaWxpdHkiOiJ2aWV3IiwiaW5wdXRzIjpbXSwib3V0cHV0cyI6W3siaWQiOiJOb0lPNTIifV19LCJpIjoibUoxb3NqIiwieCI6MCwieSI6MiwidyI6NiwibWluVyI6MX0seyJuYW1lIjoiVGV4dCIsImgiOjEsInZhbHVlIjoiVGV4dCIsImxpbmsiOiIiLCJzdHlsZSI6eyJjb2xvciI6eyJyIjoiMCIsImciOiIwIiwiYiI6IjAiLCJhIjoiMTAwIn0sImJhY2tncm91bmRDb2xvciI6eyJyIjoiMCIsImciOiIwIiwiYiI6IjAifSwiZm9udFdlaWdodCI6Im5vcm1hbCIsImZvbnRTdHlsZSI6Im5vcm1hbCIsInRleHREZWNvcmF0aW9uIjoibm9uZSIsImp1c3RpZnlDb250ZW50IjoiY2VudGVyIiwiZm9udFNpemUiOjE1LCJkZWxldGVDb21wb25lbnQiOjB9LCJpIjoiTm9JTzUyIiwieCI6MCwieSI6MywidyI6NiwibWluVyI6MX1dLCJjb250cmFjdCI6eyJhYmkiOlt7ImlucHV0cyI6W3siaW50ZXJuYWxUeXBlIjoidWludDI1NiIsIm5hbWUiOiJtaW5pbXVtIiwidHlwZSI6InVpbnQyNTYifV0sIm5hbWUiOiJjcmVhdGVDYW1wYWlnbiIsIm91dHB1dHMiOltdLCJzdGF0ZU11dGFiaWxpdHkiOiJub25wYXlhYmxlIiwidHlwZSI6ImZ1bmN0aW9uIn0seyJpbnB1dHMiOlt7ImludGVybmFsVHlwZSI6InVpbnQyNTYiLCJuYW1lIjoiIiwidHlwZSI6InVpbnQyNTYifV0sIm5hbWUiOiJkZXBsb3llZENhbXBhaWducyIsIm91dHB1dHMiOlt7ImludGVybmFsVHlwZSI6ImFkZHJlc3MiLCJuYW1lIjoiIiwidHlwZSI6ImFkZHJlc3MifV0sInN0YXRlTXV0YWJpbGl0eSI6InZpZXciLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImlucHV0cyI6W10sIm5hbWUiOiJnZXREZXBsb3llZENhbXBhaWducyIsIm91dHB1dHMiOlt7ImludGVybmFsVHlwZSI6ImFkZHJlc3NbXSIsIm5hbWUiOiIiLCJ0eXBlIjoiYWRkcmVzc1tdIn1dLCJzdGF0ZU11dGFiaWxpdHkiOiJ2aWV3IiwidHlwZSI6ImZ1bmN0aW9uIn0seyJpbnB1dHMiOlt7ImludGVybmFsVHlwZSI6InVpbnQyNTYiLCJuYW1lIjoiIiwidHlwZSI6InVpbnQyNTYifSx7ImludGVybmFsVHlwZSI6InVpbnQyNTYiLCJuYW1lIjoiTWFpbiIsInR5cGUiOiJ1aW50MjU2In1dLCJuYW1lIjoibmV3Q2FtcGFpZ25zIiwib3V0cHV0cyI6W3siaW50ZXJuYWxUeXBlIjoiYWRkcmVzcyIsIm5hbWUiOiJNYWluIiwidHlwZSI6ImFkZHJlc3MifSx7ImludGVybmFsVHlwZSI6ImFkZHJlc3MiLCJuYW1lIjoiU2Vjb25kYXJ5IiwidHlwZSI6ImFkZHJlc3MifV0sInN0YXRlTXV0YWJpbGl0eSI6InZpZXciLCJ0eXBlIjoiZnVuY3Rpb24ifV0sImFkZHJlc3MiOiIweDczYmE0QjZBNThDNjdDNzAyODFDMTdhQzIzODkzYjdCRDRjODg5N0UifX0="
);

export default BuilderConfig;
