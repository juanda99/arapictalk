import sys

def resolve_sidebar():
    path = '/Users/juanda/code/arasaac/arapictalk/src/components/Sidebar.tsx'
    with open(path, 'r') as f:
        lines = f.readlines()
    
    new_lines = []
    skip = False
    
    # Simple state machine to resolve the specific conflicts found
    i = 0
    while i < len(lines):
        line = lines[i]
        if '<<<<<<< HEAD' in line:
            # Check which block it is
            if 'import { themeModeAtom }' in lines[i+2]:
                # Keep the import
                new_lines.append(lines[i+2])
                i += 4
            else:
                # Block 2, just skip
                i += 4
        else:
            new_lines.append(line)
            i += 1
            
    with open(path, 'w') as f:
        f.writelines(new_lines)

resolve_sidebar()
