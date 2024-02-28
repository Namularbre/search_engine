const WebPageModel = require('../models/WebPageModel');

class WebPageController {
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
                const amountOfDataPerPages = 20;

                const searchQuery = keywords.replace(/-/g, ' ');

                const results = await WebPageModel.find(
                    {
                        $text: {
                            $search: searchQuery,
                            $caseSensitive: false,
                            $diacriticSensitive: false
                        },
                    },
                    {
                        score: { $meta: "textScore" }
                    }
                )
                    .skip(page * amountOfDataPerPages)
                    .limit(amountOfDataPerPages)
                    .sort({ score: { $meta: "textScore" } })
                    .exec();

                const totalPages = await WebPageModel.countDocuments({
                    $text: {
                        $search: searchQuery,
                        $caseSensitive: false,
                        $diacriticSensitive: false
                    },
                });

                res.render('templates/searchPage', {
                    results: results,
                    totalPages: Math.floor(totalPages / amountOfDataPerPages),
                    keywords: new URLSearchParams(keywords),
                    title: searchQuery,
                    page: page
                });
            } catch (error) {
                console.error(error.message);
                res.status(500).send({ message: 'Internal server error.' });
            }
        } else {
            res.status(400).send({ message: 'Missing keyword in request params.' });
        }
    }
}

module.exports = WebPageController;
