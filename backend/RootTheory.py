data = {
    "name": "My Awesome Design V1",
    "total_color_palettes": 3,
    "color_box_1": "#FF0000",
    "color_box_2": "#00FF00",
    "color_box_3": "#0000FF",
    "color_box_4": "#FFFF00",
    "starting_position": 1,
    "machine_type": "Left-handed",
    "design_grids": [
        {"color_box": 1, "total_pics": 5},
        {"color_box": 2, "total_pics": 8},
        {"color_box": 3, "total_pics": 12},
    ],
}


generated_commands = []
temp_commands = ""
final_command = ""

active_box = data["starting_position"]

for i in data["design_grids"]:
    target_box = i["color_box"]
    pic_no = i["total_pics"]

    if active_box == 1:
        if target_box == 1:
            generated_commands.append("A")
        elif target_box == 2:
            generated_commands.append("C")
        elif target_box == 3:
            generated_commands.append("B")
        elif target_box == 4:
            generated_commands.append("D")

    elif active_box == 2:
        if target_box == 1:
            generated_commands.append("C")
        elif target_box == 2:
            generated_commands.append("A")
        elif target_box == 3:
            generated_commands.append("D")
        elif target_box == 4:
            generated_commands.append("B")

    elif active_box == 3:
        if target_box == 1:
            generated_commands.append("B")
        elif target_box == 2:
            generated_commands.append("D")
        elif target_box == 3:
            generated_commands.append("A")
        elif target_box == 4:
            generated_commands.append("C")

    elif active_box == 4:
        if target_box == 1:
            generated_commands.append("D")
        elif target_box == 2:
            generated_commands.append("B")
        elif target_box == 3:
            generated_commands.append("C")
        elif target_box == 4:
            generated_commands.append("A")

    active_box = target_box
    generated_commands.append("A" * (pic_no - 1))


for i in generated_commands:
    temp_commands += i


if data["machine_type"] == "Right-handed":
    for i in temp_commands:
        if i == "A":
            final_command += "D"
        elif i == "B":
            final_command += "C"
        elif i == "C":
            final_command += "B"
        elif i == "D":
            final_command += "A"
else:
    final_command = temp_commands


print(final_command)
