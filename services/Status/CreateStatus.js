const Status = require("../../models/status");

export const CreateStatus = async (created_by, caption) => {
    const status = await Status.create({
        created_by,
        caption,
    });

    return status;
}