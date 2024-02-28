const WebPageModel = require('../models/WebPageModel');

/**
 *
 */
class APIWebPageController {
    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<void>}
     */
    static async search(req, res) {
        let { keywords, page } = req.query;

        if (keywords) {
            if (!page) {
                page = 0;
            }

            try {
                const searchQuery = keywords.replace(/-/g, ' ');

                const results = await WebPageModel.find({
                        $text: {
                            $search: searchQuery,
                            $caseSensitive: false,
                            $diacriticSensitive: false
                        }
                    },
                    {
                        score: { $meta: "textScore" }
                    }
                )
                    .skip(page * 20)
                    .limit(20)
                    .sort({ score: { $meta: "textScore" } })
                    .exec();


                res.send(results);
            } catch (error) {
                console.error(error.message);
                res.status(500).send({ message: 'Internal server error.' });
            }
        } else {
            res.status(400).send({ message: 'Missing keyword in request params.' });
        }
    }
}

module.exports = APIWebPageController;
