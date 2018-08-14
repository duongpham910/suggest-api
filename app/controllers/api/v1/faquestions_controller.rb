class Api::V1::FaquestionsController < Api::V1::BaseController
  def index
    @faquestions = Faquestion.all
    response_success @faquestions
  end
end
