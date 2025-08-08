userRouter.patch('/update-user/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ msg: `User with ID ${id} not found in database.` });
        }

        await UserModel.findByIdAndUpdate(id, updatedData);
        res.status(200).json({ msg: "User data updated successfully!", updatedData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: `An error occurred while updating user with ID: ${id}` });
    }
});