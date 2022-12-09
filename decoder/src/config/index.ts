import { decode as base64_decode } from "base-64";

const BuilderConfig = base64_decode(
  "eyJoZWFkIjp7InRpdGxlIjoiIiwibG9nbyI6IiJ9LCJiYWNrZ3JvdW5kIjoicmdiYSgyNTUsIDI1NSwgMjU1LCAxKSIsImJ1aWxkZXIiOlt7Im5hbWUiOiJMZW5zdGVyIENhcmQiLCJuZnQiOnRydWUsImgiOjE1LCJwb3N0SWRzIjpbeyJpZCI6ImVTalhQUSIsIm5hbWUiOiIweDAxNmIwZi0weDQ5IiwicHJvZmlsZUlkIjoiMHgwMTZiMGYiLCJvd25lZEJ5IjoiMHg0YjcwZDA0MTI0YzI5OTZEZTI5ZTBjYWEwNTBBNDk4MjJGYWVjNkNjIiwicHJvZmlsZVBpY3R1cmUiOiJpcGZzOi8vYmFmeWJlaWY3cHR1cW9qb3l1cXVnajYycXZwcmJ1dGxyZ2Riand6YTRjd2tyNXFjd3hlenlkc3A1cm0iLCJoYW5kbGUiOiJwcmFzaGFudGJhZ2dhLmxlbnMiLCJwcm9maWxlTmFtZSI6IlByYXNoYW50ICIsImNyZWF0ZWRBdCI6IjIwMjItMTItMDhUMTg6MzI6NDMuMDAwWiIsInBvc3REZXNjcmlwdGlvbiI6IjE1MCB3ZW4/In0seyJpZCI6ImJ6c29QQyIsIm5hbWUiOiIweDliMWUtMHg1MyIsInByb2ZpbGVJZCI6IjB4OWIxZSIsIm93bmVkQnkiOiIweDU0NjFkMWE3NDlEMmQ1RjI1M0M0YzY5NzFjQUZCNzhhODY5MTk4NTkiLCJwcm9maWxlUGljdHVyZSI6ImlwZnM6Ly9RbVdYTXZUSHBlVzVENXUyV2hLM2NHMXhjc1ZUcWY3Mmg1ZnByMVpBdWRHZGF3IiwiY292ZXJQaWN0dXJlIjoiaHR0cHM6Ly9pay5pbWFnZWtpdC5pby9sZW5zdGVyaW1nL3RyOm4tYXR0YWNobWVudCx0cjpkaS1wbGFjZWhvbGRlci53ZWJwL2h0dHBzOi8vaWsuaW1hZ2VraXQuaW8vbGVuc3RlcmltZy90cjpuLWF0dGFjaG1lbnQsdHI6ZGktcGxhY2Vob2xkZXIud2VicC9odHRwczovL2xlbnMuaW5mdXJhLWlwZnMuaW8vaXBmcy9RbVl6Ujg5eENWeFFldzZ2UmtNS1FaaFhBTVdFTjk2bllyRGJDNWhpN0QyU292IiwiaGFuZGxlIjoibmlrb29uZS5sZW5zIiwicHJvZmlsZU5hbWUiOiJuaWtvIiwiY3JlYXRlZEF0IjoiMjAyMi0xMi0wOFQxODozMzo1OS4wMDBaIiwicG9zdERlc2NyaXB0aW9uIjoibm90aGluZy4ifSx7ImlkIjoiaDZVZVBIIiwibmFtZSI6IjB4ZmZkZC0weDZhIiwicHJvZmlsZUlkIjoiMHhmZmRkIiwib3duZWRCeSI6IjB4MzhhYmFDMUI0MmViQzk0MjlDQjNjOUUyNDJkZWU1ZUExMTA0YmU1ZCIsInByb2ZpbGVQaWN0dXJlIjoiaXBmczovL1FtVXJQc0NUYXNhNXlxcGFOemc4VTRmRmRlNkIyM2pSYTN5c1pkblN5eXRLY1oiLCJjb3ZlclBpY3R1cmUiOiJpcGZzOi8vYmFma3JlaWI2cTRheTdldG1hZnRxZXczb3kzcXdkeGY1enBmaXlmaHJvamNlcXRmd3JnZnhxYXk0YmEiLCJoYW5kbGUiOiJpYm5pbmdsb3IubGVucyIsInByb2ZpbGVOYW1lIjoiSWJuIEluZ2xvciIsImNyZWF0ZWRBdCI6IjIwMjItMTItMDhUMTg6MzQ6NTUuMDAwWiIsInBvc3REZXNjcmlwdGlvbiI6ImdtIGxlbnMhIn0seyJpZCI6IlZVWDdpQyIsIm5hbWUiOiIweDA5ODMtMHgxNSIsInByb2ZpbGVJZCI6IjB4MDk4MyIsIm93bmVkQnkiOiIweGYzQjFCNmU4M0JlNGQ1NTY5NWYxRDMwYWMzRDMwN0Q5RDVDQTk4ZmYiLCJoYW5kbGUiOiJkZWZpZHVkZS5sZW5zIiwicHJvZmlsZU5hbWUiOiJEZUZpIER1ZGUiLCJjcmVhdGVkQXQiOiIyMDIyLTExLTIyVDE4OjAxOjQwLjAwMFoiLCJwb3N0RGVzY3JpcHRpb24iOiJJIGxvdmUgaG93IHBlb3BsZSBhcmUgc3VnZ2VzdGluZyBzb21ldGhpbmcgbGlrZSBNYXN0b2RvbiBvdmVyIExlbnMgYWZ0ZXIgYWxsIHRoaXMgVHdpdHRlciBkcmFtYS5cblxuSSdtIGdvaW5nIHRvIGFzc3VtZSBpdCdzIGp1c3QgYmVjYXVzZSB0aGV5IGRvbid0IGtub3cuIElmIG9ubHkgdGhleSBrbmV3LlxuXG5nbSBMZW5zIGZhbS4ifV0sInN0eWxlIjp7ImRlbGV0ZUNvbXBvbmVudCI6ZmFsc2V9LCJpIjoielpEOWtrIiwieCI6MCwieSI6MCwidyI6NiwibWluVyI6MSwicmVzaXplSGFuZGxlcyI6WyJzZSJdfV0sImNvbnRyYWN0Ijp7ImFiaSI6W10sImFkZHJlc3MiOiIiLCJuZXR3b3JrIjoiIn19"
  // process.env.REACT_APP_BUIDLFY_CONFIGURATION || ""
);

export default BuilderConfig;
