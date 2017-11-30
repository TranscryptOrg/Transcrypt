a = 1

__pragma__ ('xtrans', 'change_case.exe', '{}',
'''/*
<div id="StudentContainer">
    {self.props.students.map((s) => (
        <StudentTile student={s}  key={s.searchval}  />
    ))}
</div>
*/\f''',
    cwd = 'workdir', 
)

__pragma__ ('xtrans', 'change_case.exe -l', '{}',
'''/*
<div id="StudentContainer">
    {self.props.students.map((s) => (
        <StudentTile student={s}  key={s.searchval}  />
    ))}
</div>
*/\f''',
    cwd = 'workdir', 
)

b = 2
