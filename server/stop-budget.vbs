Set WshShell = CreateObject("WScript.Shell") 
WshShell.Run chr(34) & "C:\Projects\FamilyBudget\server\_stop-budget.bat" & Chr(34), 0
Set WshShell = Nothing