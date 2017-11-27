a = 1

__pragma__ ('xtrans', 'capitalize.exe', '{}',
'''/*
<div id="StudentContainer">
    {self.props.students.map((s) => (
        <StudentTile student={s}  key={s.searchval}  />
    ))}
</div>
*/\f'''
)

b = 2
