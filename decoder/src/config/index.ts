import { decode as base64_decode } from "base-64";

export const OracleContractAddress =
  "0x456891c78077d31f70ca027a46d68f84a2b814d4";

const BuilderConfig = base64_decode(
  "eyJoZWFkIjp7InRpdGxlIjoiIiwibG9nbyI6IiJ9LCJiYWNrZ3JvdW5kIjoicmdiYSgyNTUsIDI1NSwgMjU1LCAxKSIsImJ1aWxkZXIiOlt7Im5hbWUiOiJMZW5zdGVyIENhcmQiLCJuZnQiOnRydWUsImgiOjI2LCJwb3N0SWRzIjpbeyJpZCI6IjVtMU9kSSIsIm5hbWUiOiIweGYyYTUtMHgzNSIsInByb2ZpbGVJZCI6IjB4ZjJhNSIsIm93bmVkQnkiOiIweDM3MmM3ODlhYTQ2NTAzMTgyQjgzOTU2ODYwOWJkMTNDZmMxZGFBQUQiLCJwcm9maWxlUGljdHVyZSI6ImlwZnM6Ly9RbWNadDIxREVHVHZveTliZXNzSm9wNkJmVEt0MW8yRTVDS1BVQzJKQXhrUGVYIiwiY292ZXJQaWN0dXJlIjoiaXBmczovL2JhZmtyZWlicGYzdWFlaWRwN29wbTZhYWZqY2N6bmY2bmNjbGJ6aG93d3J0Y2IyaXV6cG5uamI2cXc0IiwiaGFuZGxlIjoiZ3JlZ3lvdW5nZXIubGVucyIsInByb2ZpbGVOYW1lIjoiR3JlZyBZb3VuZ2VyIiwiY3JlYXRlZEF0IjoiMjAyMi0xMi0xMlQxNDoxMzoyNy4wMDBaIiwicG9zdERlc2NyaXB0aW9uIjoiVGhlIHV0aWxpdHkgb2YgV2ViMy9ORlRzL0NyeXB0byBpcyBvd25lcnNoaXAsIGRlY2VudHJhbGl6YXRpb24gJiBmcmVlZG9tLlxuXG5JdCdzIGlyb25pYyB0aGF0IHNvIG1hbnkgbG9vayB0byBhIGNlbnRyYWxpemVkIHBlcnNvbiB0byBmaXggdGhlaXIgcHJvYmxlbXMuXG5cbk11c2sgaXMgbmVpdGhlciB0aGUgcHJvYmxlbSBub3IgdGhlIHNvbHV0aW9uLlxuXG5TZWxmLXJlbGlhbmNlIGlzIHRoZSB3YXkuXG5cbkRlY2VudHJhbGl6ZWQgc29jaWFsIG1lZGlhIGlzIHRoZSBmdXR1cmUuIn0seyJpZCI6Im1QV1k2byIsIm5hbWUiOiIweDliMWUtMHg1MyIsInByb2ZpbGVJZCI6IjB4OWIxZSIsIm93bmVkQnkiOiIweDU0NjFkMWE3NDlEMmQ1RjI1M0M0YzY5NzFjQUZCNzhhODY5MTk4NTkiLCJwcm9maWxlUGljdHVyZSI6ImlwZnM6Ly9RbVdEQUxacGE4c2tybVR5WFlUWmt4VkJFbTJnQ3F2aVc5UUZwTTlCanZGNFg5IiwiY292ZXJQaWN0dXJlIjoiaHR0cHM6Ly9pay5pbWFnZWtpdC5pby9sZW5zdGVyaW1nL3RyOm4tYXR0YWNobWVudCx0cjpkaS1wbGFjZWhvbGRlci53ZWJwL2h0dHBzOi8vaWsuaW1hZ2VraXQuaW8vbGVuc3RlcmltZy90cjpuLWF0dGFjaG1lbnQsdHI6ZGktcGxhY2Vob2xkZXIud2VicC9odHRwczovL2xlbnMuaW5mdXJhLWlwZnMuaW8vaXBmcy9RbVl6Ujg5eENWeFFldzZ2UmtNS1FaaFhBTVdFTjk2bllyRGJDNWhpN0QyU292IiwiaGFuZGxlIjoibmlrb29uZS5sZW5zIiwicHJvZmlsZU5hbWUiOiJuaWtvIiwiY3JlYXRlZEF0IjoiMjAyMi0xMi0wOFQxODozMzo1OS4wMDBaIiwicG9zdERlc2NyaXB0aW9uIjoibm90aGluZy4ifSx7ImlkIjoiRHJocG42IiwibmFtZSI6IjB4MDE2YjBmLTB4NDkiLCJwcm9maWxlSWQiOiIweDAxNmIwZiIsIm93bmVkQnkiOiIweDRiNzBkMDQxMjRjMjk5NkRlMjllMGNhYTA1MEE0OTgyMkZhZWM2Q2MiLCJwcm9maWxlUGljdHVyZSI6ImlwZnM6Ly9iYWZ5YmVpZjdwdHVxb2pveXVxdWdqNjJxdnByYnV0bHJnZGJqd3phNGN3a3I1cWN3eGV6eWRzcDVybSIsImhhbmRsZSI6InByYXNoYW50YmFnZ2EubGVucyIsInByb2ZpbGVOYW1lIjoiUHJhc2hhbnQgIiwiY3JlYXRlZEF0IjoiMjAyMi0xMi0wOFQxODozMjo0My4wMDBaIiwicG9zdERlc2NyaXB0aW9uIjoiMTUwIHdlbj8ifSx7ImlkIjoiNGZjRFlaIiwibmFtZSI6IjB4MDE1OTk5LTB4MWUiLCJwcm9maWxlSWQiOiIweDAxNTk5OSIsIm93bmVkQnkiOiIweGEyNDk1RDI2MzA3RUI1OGQ2NENmNzhmYkUxRjUxNUUzQmEwOTlmZjEiLCJwcm9maWxlUGljdHVyZSI6ImlwZnM6Ly9RbVJGVldYVFJEN201MlFqbWc0Vnl6dThjRUFjVlAyc0wzaFVLTDJzcVI0eTdtIiwiaGFuZGxlIjoiMHhjYW5kaWNlLmxlbnMiLCJwcm9maWxlTmFtZSI6IkNhbmRpY2UiLCJjcmVhdGVkQXQiOiIyMDIyLTExLTIyVDIxOjUzOjE3LjAwMFoiLCJwb3N0RGVzY3JpcHRpb24iOiJJIGZpbmQgdGhhdCBJIGFtIGxpbWl0ZWQgaW4gdXNpbmcgTGVucyBhcyBJIGhhdmUgdG8gdXNlIGl0IG9uIG15IGxhcHRvcCBhbmQgbm90IG15IHBob25lIC0gaXMgdGhlcmUgYSBtb2JpbGUgYXBwIGJ1dCB0aGVuIHRoZXJlIGFyZSBpc3N1ZXMgd2l0aCBjb25uZWN0aW5nIGl0IHRvIHlvdXIgd2FsbGV0Li4uLiB3ZWIzIHByb2JsZW1zLi4uIn0seyJpZCI6IkoySUxKOCIsIm5hbWUiOiIweDA5ODMtMHgxNSIsInByb2ZpbGVJZCI6IjB4MDk4MyIsIm93bmVkQnkiOiIweGYzQjFCNmU4M0JlNGQ1NTY5NWYxRDMwYWMzRDMwN0Q5RDVDQTk4ZmYiLCJoYW5kbGUiOiJkZWZpZHVkZS5sZW5zIiwicHJvZmlsZU5hbWUiOiJEZUZpIER1ZGUiLCJjcmVhdGVkQXQiOiIyMDIyLTExLTIyVDE4OjAxOjQwLjAwMFoiLCJwb3N0RGVzY3JpcHRpb24iOiJJIGxvdmUgaG93IHBlb3BsZSBhcmUgc3VnZ2VzdGluZyBzb21ldGhpbmcgbGlrZSBNYXN0b2RvbiBvdmVyIExlbnMgYWZ0ZXIgYWxsIHRoaXMgVHdpdHRlciBkcmFtYS5cblxuSSdtIGdvaW5nIHRvIGFzc3VtZSBpdCdzIGp1c3QgYmVjYXVzZSB0aGV5IGRvbid0IGtub3cuIElmIG9ubHkgdGhleSBrbmV3LlxuXG5nbSBMZW5zIGZhbS4ifSx7ImlkIjoicTliSHU5IiwibmFtZSI6IjB4ZjJhNS0weDMzIiwicHJvZmlsZUlkIjoiMHhmMmE1Iiwib3duZWRCeSI6IjB4MzcyYzc4OWFhNDY1MDMxODJCODM5NTY4NjA5YmQxM0NmYzFkYUFBRCIsInByb2ZpbGVQaWN0dXJlIjoiaXBmczovL1FtY1p0MjFERUdUdm95OWJlc3NKb3A2QmZUS3QxbzJFNUNLUFVDMkpBeGtQZVgiLCJjb3ZlclBpY3R1cmUiOiJpcGZzOi8vYmFma3JlaWJwZjN1YWVpZHA3b3BtNmFhZmpjY3puZjZuY2NsYnpob3d3cnRjYjJpdXpwbm5qYjZxdzQiLCJoYW5kbGUiOiJncmVneW91bmdlci5sZW5zIiwicHJvZmlsZU5hbWUiOiJHcmVnIFlvdW5nZXIiLCJjcmVhdGVkQXQiOiIyMDIyLTEyLTA5VDE0OjQ2OjQxLjAwMFoiLCJwb3N0RGVzY3JpcHRpb24iOiJJJ20gbmV3IGhlcmUuICBcblxuV2hvIGFyZSB5b3VyIGZhdm9yaXRlIGZvbGxvd3Mgb24gTGVuc3Rlcj8ifSx7ImlkIjoiTDlqYU1zIiwibmFtZSI6IjB4NzNhNC0weDA3NGMiLCJwcm9maWxlSWQiOiIweDczYTQiLCJvd25lZEJ5IjoiMHg3Q2ZlMzEwYjMxQzcxQzQ1YTgxNDEzMjZDYjczRjdlMjQ4YTQyYmQxIiwicHJvZmlsZVBpY3R1cmUiOiJpcGZzOi8vYmFma3JlaWQ1Ym1ka2J4dTc0NXdlNmRha2p5NW43bzM1bW1oNnA0aDRhb3Q2Z3ZpbjJ4cXBydTdxY3EiLCJjb3ZlclBpY3R1cmUiOiJpcGZzOi8vYmFmeWJlaWZvYW9mN2xhNm5pZjd1Z3lja3FsdWVnaGpleTZ5eHdtdjI3Mm9pdGtscnZ0d2p4N2Zzb2EiLCJoYW5kbGUiOiJwZWRyb21vbnRlLmxlbnMiLCJwcm9maWxlTmFtZSI6IlBlaGgiLCJjcmVhdGVkQXQiOiIyMDIyLTEyLTEyVDE3OjEzOjMxLjAwMFoiLCJwb3N0RGVzY3JpcHRpb24iOiJgQ3VycmVudCBNb29kOmBcblxuRmluaXNoaW5nIHdvcmsgJiBnb2luZyB0byB0aGUgeC1tYXMgbWFya2V0IG5lYXJieSBhbmQgZ2V0dGluZyBzb21lIG11bGxlZCB3aW5lIiwicG9zdE1lZGlhIjoiaXBmczovL2JhZnliZWllM2Rka2pvajZud2FrcGZtZmZqY2g0eGE3b3hocGhwc3htdXJkNnVyamhhcGh4b2VzNDJ5In0seyJpZCI6IjdmZUtBaCIsIm5hbWUiOiIweDAxMmQ0ZS0weGJlIiwicHJvZmlsZUlkIjoiMHgwMTJkNGUiLCJvd25lZEJ5IjoiMHgyYjY5OEViQjE0M0JDOUQ0ZjNhMDRkRTQwQzZlRTk2MTgyZWU5MjU3IiwicHJvZmlsZVBpY3R1cmUiOiJpcGZzOi8vUW1lU0J0czFlcDltQkRaWlBHRHVEcXV3OXQ5RUJ6c1lFTHA2RkxTaUNQWkV3eiIsImNvdmVyUGljdHVyZSI6ImlwZnM6Ly9iYWZ5YmVpZnBzYndhZjdqYW53bWlsemNxNjZtZ21udDZzMm92N2pldnFqZXdsbmpmNXh3bGpyeXJkaSIsImhhbmRsZSI6ImNvbm5lY3R0aGVjb2FzdC5sZW5zIiwicHJvZmlsZU5hbWUiOiJDb25uZWN0IHRoZSBDb2FzdCIsImNyZWF0ZWRBdCI6IjIwMjItMTItMTJUMTk6NTg6MDAuMDAwWiIsInBvc3REZXNjcmlwdGlvbiI6IlJvdW5kNCBpcyBhIGxpdmUgcGVyZm9ybWFuY2UgcmFwIGJhdHRsZSB3aGVyZSBpbmRlcGVuZGVudCBhcnRpc3RzIGdvIHNvbmcgZm9yIHNvbmcgaW4gYSBib3hpbmcgcmluZyBpbnNpZGUgYW4gYXJ0IGdhbGxlcnkuICBUaGUgZW1jZWUgd2l0aCB0aGUgbW9zdCB2b3RlcyBhdCB0aGUgZW5kIG9mIHRoZSBuaWdodCB3aW5zIGEgcHJpemUgYW5kIGEgcG9ydGlvbiBvZiB0aGUgdGlja2V0IHNhbGVzIGFyZSBkb25hdGVkIHRvIGxvY2FsIGNoYXJpdGllcy4gXG5cbkNvbm5lY3QgdGhlIENvYXN0IHdhbnRzIHRvIG9uYm9hcmQgUm91bmQ0IHRvIEBsZW5zcHJvdG9jb2wgYW5kIGxpY2Vuc2UgdGhlaXIgY29udGVudCBzbyB3ZSBjYW4gaG9zdCB0b2tlbi1nYXRlZCAjUm91bmQ0IGV2ZW50cyBpbiBvdXIgbWV0YXZlcnNlIHZlbnVlLCBleGNsdXNpdmVseSBmb3IgdGhlIExlbnMgY29tbXVuaXR5ISBcblxuI0xNQ0MgaWYgeW91IHRoaW5rIGl0J3MgYSBnb29kIGlkZWEhIiwicG9zdE1lZGlhIjoiaXBmczovL2JhZnliZWloMzd0dHFvdTR6amlkbGVrYWd5azM2YnlodHpoa3I3bWlxYW16N3M2aXp4aW9zMzUyY2N5In1dLCJzdHlsZSI6eyJkZWxldGVDb21wb25lbnQiOmZhbHNlfSwiaSI6InJUUllRSiIsIngiOjAsInkiOjAsInciOjYsIm1pblciOjEsInJlc2l6ZUhhbmRsZXMiOlsic2UiXX1dLCJjb250cmFjdCI6eyJhYmkiOltdLCJhZGRyZXNzIjoiIiwibmV0d29yayI6IiJ9fQ=="
  // process.env.REACT_APP_BUIDLFY_CONFIGURATION || ""
);

export default BuilderConfig;
